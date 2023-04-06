namespace Identity.API.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;        
        private readonly JWTSettings _jwtSettings;       
        private readonly ILogger<AccountService> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public AccountService(UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<JWTSettings> jwtSettings,
            IUnitOfWork unitOfWork,
            ILogger<AccountService> logger
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings.Value;
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        public async Task<OperationResponse<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request, string ipAddress)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user == null)
            {
                throw new ApiException($"No Accounts Registered with {request.UserName}.");
            }
            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
            if (!result.Succeeded)
            {
                throw new ApiException($"Invalid Credentials for '{request.UserName}'.");
            }
            
            //if (!user.EmailConfirmed)
            //{
            //    throw new ApiException($"Account Not Confirmed for '{request.UserName}'.");
            //}
            
            JwtSecurityToken jwtSecurityToken = await GenerateJWToken(user);
            AuthenticationResponse response = new AuthenticationResponse();
            response.Id = user.Id.ToString();
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            response.Email = user.Email;
            response.UserName = user.UserName;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            response.Roles = rolesList.ToList();
            response.IsVerified = user.EmailConfirmed;
            var refreshToken = GenerateRefreshToken(ipAddress);
            response.RefreshToken = refreshToken.Token;
            refreshToken.UserId = user.Id;
            refreshToken.Expires = DateTime.Now.AddDays(_jwtSettings.RefreshTokenValidityInDays);
                     
            await _userManager.UpdateAsync(user);
            await _unitOfWork.RefreshTokenRepository.AddAsync(refreshToken);
            await _unitOfWork.CompleteAsync();

            return new OperationResponse<AuthenticationResponse>(response, $"Authenticated {user.UserName}");
        }        

        public async Task<OperationResponse<string>> RegisterRoleAsync(RegisterRequestRole request, string origin)
        {            
            bool isRoleExists = await _roleManager.RoleExistsAsync(request.RoleName);
            if (isRoleExists) throw new ApiException($"Role '{request.RoleName}' already exists.");
            var role = new ApplicationRole
            {
                Name = request.RoleName,
                Status = (int)RoleStatus.Active,
            };
            var result = await _roleManager.CreateAsync(role);
            await _unitOfWork.CompleteAsync();
            if (result.Succeeded)
            {
                return new OperationResponse<string>(role.Name, message: $"Role Registered.");
            }
            else
            {
                throw new ApiException($"{result.Errors.ToList()[0].Description}");                
            }
        }

        public async Task<OperationResponse<Tenant>> RegisterTenantAsync(RegisterRequestTenant request, string origin)
        {
            var tenantWithSameTenantName = await _unitOfWork.TenantRepository.GetOneAsync(x=>x.TenantName==request.TenantName);
            if (tenantWithSameTenantName != null) throw new ApiException($"Tenant '{request.TenantName}' already exists.");
            var tenant = new Tenant
            {
                TenantName = request.TenantName,
                Status = (int)TenantStatus.Active,
            };
            var result = await _unitOfWork.TenantRepository.AddAsync(tenant);
            await _unitOfWork.CompleteAsync();
            if (result != null)
            {
                return new OperationResponse<Tenant>(result, message: $"Tenant Registered.");
            }
            else
            {
                throw new ApiException($"Tenant named - {tenant.TenantName} could not be created.");                
            }
        }

        public async Task<OperationResponse<string>> RegisterUserAsync(RegisterRequestUser request, string origin)
        {
            var userWithSameUserName = await _userManager.FindByNameAsync(request.UserName);
            if (userWithSameUserName != null) throw new ApiException($"Username '{request.UserName}' already eixists.");

            var user = new ApplicationUser
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                EmpID = request.EmpID > 0 ? request.EmpID : null,
                Status = (int)UserStatus.Active
            };

            //var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
            //if (userWithSameEmail != null) throw new ApiException($"Email {request.Email} is already registered.");

            var result = await _userManager.CreateAsync(user, request.Password);
            
            if (result.Succeeded)
            {
                var addedUser = await _userManager.FindByNameAsync(request.UserName);
                foreach (var role in request.Roles)
                {
                    bool isRoleExists = await _roleManager.RoleExistsAsync(role);
                    //var roleFromDb = await _roleManager.FindByIdAsync(role.ToString());
                    if (isRoleExists) await _userManager.AddToRoleAsync(user, role);
                }

                foreach (var tenant in request.Tenants)
                {
                    var tenantFromDb = await _unitOfWork.TenantRepository.GetOneAsync(x=>x.TenantName == tenant);
                    if (tenantFromDb != null)
                    {
                        var userTenant = new UserTenant
                        {
                            TenantId = tenantFromDb.Id,
                            UserId = addedUser.Id,                            
                        };
                        await _unitOfWork.UserTenantRepository.AddAsync(userTenant);
                    }
                }
                var verificationUri = await SendVerificationEmail(user, origin);

                //if (await _featureManager.IsEnabledAsync(nameof(FeatureManagement.EnableEmailService)))
                //{
                //    // Todo: Sending email notification to admin address
                //    var email = new MailRequest() { ToEmail = "chinchu.tharayil@nabina.com", Body = $"Please confirm your account by visiting this URL {verificationUri}", Subject = "Confirm Registration" };
                //    await _emailService.SendEmailAsync(email);
                //}
                await _unitOfWork.CompleteAsync();
                return new OperationResponse<string>(user.UserName, message: $"User Registered.");
            }
            else
            {
                throw new ApiException($"{result.Errors.ToList()[0].Description}");
            }
        }

        public async Task ForgotPasswordAsync(ForgotPasswordRequest model, string origin)
        {
            var account = await _userManager.FindByEmailAsync(model.Email);

            // always return ok response to prevent email enumeration
            if (account == null) return;

            var code = await _userManager.GeneratePasswordResetTokenAsync(account);
            var route = "api/account/reset-password/";
            var _enpointUri = new Uri(string.Concat($"{origin}/", route));
            //Write code here to send an email to the user with the absolute URL of the reset endpoint
            //and the password reset token as querystring to reset the pasword.
        }

        public async Task<OperationResponse<string>> ResetPasswordAsync(ResetPasswordRequest model)
        {
            var account = await _userManager.FindByNameAsync(model.UserName);
            if (account == null) throw new ApiException($"No Accounts Registered with {model.UserName}.");
            var token = await _userManager.GeneratePasswordResetTokenAsync(account);
            //var result = await _userManager.ResetPasswordAsync(account, model.Token, model.Password);
            var result = await _userManager.ResetPasswordAsync(account, token, model.Password);
            if (result.Succeeded)
            {
                return new OperationResponse<string>(model.UserName, message: $"Password Resetted.");
            }
            else
            {
                throw new ApiException($"Error occured while reseting the password.");
            }
        }

        public async Task<OperationResponse<AuthenticationResponse>> RefreshTokenAsync(TokenModel model, string ipAddress)
        {
            if (model is null) throw new ApiException($"Invalid client request.");
            
            string? accessToken = model.AccessToken;
            string? refreshToken = model.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null) throw new ApiException($"Invalid access token or refresh token.");


#pragma warning disable CS8602 // Dereference of a possibly null reference.
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            string username = principal.Identity.Name;
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning restore CS8602 // Dereference of a possibly null reference.


            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new ApiException($"No User Registered with {username}.");

            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetOneAsync(x => x.UserId == user.Id && x.Token == refreshToken && !x.IsExpired);
                        
            var newAccessToken = CreateToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken(ipAddress);
            
            AuthenticationResponse response = new AuthenticationResponse();
            response.Id = user.Id.ToString();
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken);
            response.Email = user.Email;
            response.UserName = user.UserName;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            response.Roles = rolesList.ToList();
            response.IsVerified = user.EmailConfirmed;            
            response.RefreshToken = newRefreshToken.Token;
            newRefreshToken.Expires = DateTime.Now.AddDays(_jwtSettings.RefreshTokenValidityInDays);

            await _userManager.UpdateAsync(user);
            await _unitOfWork.RefreshTokenRepository.AddAsync(newRefreshToken);
            await _unitOfWork.CompleteAsync();

            return new OperationResponse<AuthenticationResponse>(response, $"Authenticated {user.UserName}");
            
        }

        public async Task<OperationResponse<int>> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return new OperationResponse<int>(user.Id, message: $"Account Confirmed for {user.Email}. You can now use the /api/Account/authenticate endpoint.");
            }
            else
            {
                throw new ApiException($"An error occured while confirming {user.Email}.");
            }
        }

        private async Task<string> SendVerificationEmail(ApplicationUser user, string origin)
        {
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var route = "api/account/confirm-email/";
            var _enpointUri = new Uri(string.Concat($"{origin}/", route));
            var verificationUri = QueryHelpers.AddQueryString(_enpointUri.ToString(), "userId", user.Id.ToString());
            verificationUri = QueryHelpers.AddQueryString(verificationUri, "code", code);
            //Email Service Call Here
            return verificationUri;
        }

        public async Task<OperationResponse<string>> Revoke(string username, string ipAddress)
        {
            var user = await _userManager.FindByNameAsync(username);
            
            if (user == null) throw new ApiException($"Invalid user name.");

            var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetManyAsync(x => x.UserId == user.Id && !x.IsExpired);
            refreshTokens.ToList().ForEach(async x =>
            {
                x.Token = null;
                x.Expires = DateTime.UtcNow;
                x.Revoked = DateTime.UtcNow;
                x.RevokedByIp = ipAddress;
                await _unitOfWork.RefreshTokenRepository.UpdateAsync(x);
                await _unitOfWork.CompleteAsync();
            });

            return new OperationResponse<string>(user.UserName, $"Revoked all Access tokens for the user {user.UserName}");

        }

        public async Task<OperationResponse> RevokeAll(string ipAddress)
        {
            var users = _userManager.Users.ToList();
            foreach (var user in users)
            {
                var refreshTokens = await _unitOfWork.RefreshTokenRepository.GetManyAsync(x => x.UserId == user.Id && !x.IsExpired);
                refreshTokens.ToList().ForEach(async x =>
                {
                    x.Token = null;
                    x.Expires = DateTime.UtcNow;
                    x.Revoked = DateTime.UtcNow;
                    x.RevokedByIp = ipAddress;
                    await _unitOfWork.RefreshTokenRepository.UpdateAsync(x);
                    await _unitOfWork.CompleteAsync();
                });
            }
            return new OperationResponse($"Revoked Access tokens of all users.");
        }        

        private async Task<JwtSecurityToken> GenerateJWToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = new List<Claim>();

            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }

            string ipAddress = IpHelper.GetIpAddress();
            var userTenents = await _unitOfWork.UserTenantRepository.GetManyAsync(x => x.UserId == user.Id, includes: x => x.Tenant);
            var tenants = userTenents.Select(x => x.Tenant).ToList();

            var teantClaims = new List<Claim>();
            for (int i = 0; i < tenants.Count; i++)
            {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                teantClaims.Add(new Claim("tenants", tenants[i].TenantName));
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            }


            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim("uid", user.Id.ToString()),
                new Claim("ip", ipAddress),
                new Claim("empid", user.EmpID?.ToString() ?? "0"),
                new Claim("firstname", user.FirstName),
                new Claim("lastname", user.LastName),
                new Claim("fullname", user.FullName)                
            }
            .Union(userClaims)
            .Union(roleClaims)
            .Union(teantClaims)
            .ToList();
            
            var jwtSecurityToken = CreateToken(claims);
            
            return jwtSecurityToken;
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: authClaims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.TokenValidityInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)),
                ValidateLifetime = false
            };

            var principal = new JwtSecurityTokenHandler().ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }        

        private RefreshToken GenerateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
                Token = RandomTokenString(),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }

        private string RandomTokenString()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);

            ////using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            ////var randomBytes = new byte[40];
            ////rngCryptoServiceProvider.GetBytes(randomBytes);
            ////// convert random bytes to hex string
            ////return BitConverter.ToString(randomBytes).Replace("-", "");
        }        
    }
}
