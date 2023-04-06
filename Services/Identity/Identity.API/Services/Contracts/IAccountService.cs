namespace Identity.API.Services.Contracts
{
    public interface IAccountService
    {
        Task<OperationResponse<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request, string ipAddress);        
        Task<OperationResponse<string>> RegisterUserAsync(RegisterRequestUser request, string origin);
        Task<OperationResponse<string>> RegisterRoleAsync(RegisterRequestRole request, string origin);
        Task<OperationResponse<Tenant>> RegisterTenantAsync(RegisterRequestTenant request, string origin);        
        Task<OperationResponse<int>> ConfirmEmailAsync(string userId, string code);
        Task ForgotPasswordAsync(ForgotPasswordRequest model, string origin);
        Task<OperationResponse<string>> ResetPasswordAsync(ResetPasswordRequest model);
        Task<OperationResponse<AuthenticationResponse>> RefreshTokenAsync(TokenModel model, string ipAddress);
        Task<OperationResponse<string>> Revoke(string username, string ipAddress);
        Task<OperationResponse> RevokeAll(string ipAddress);
    }    
}
