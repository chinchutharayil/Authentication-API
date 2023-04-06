using Microsoft.AspNetCore.Authorization;


namespace Identity.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;
        public AccountController(IAccountService accountService, ILogger<AccountController> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(typeof(OperationResponse<AuthenticationResponse>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        //[ProducesResponseType(typeof(BadRequestObjectResult), (int)HttpStatusCode.BadRequest)]
        //[ProducesResponseType(typeof(InternalServerErrorObjectResult), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticationRequest authenticationRequest)
        {
            var ipAddress = IpHelper.GetIpAddress();
            var operationResponse = await _accountService.AuthenticateAsync(authenticationRequest, ipAddress);
            return Ok(operationResponse);
        }

        [HttpPost]
        [Route("register-user")]
        [ProducesResponseType(typeof(OperationResponse<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> RegisterUserAsync([FromBody] RegisterRequestUser request)
        {
            var origin = Request.Headers["origin"];
            var operationResponse = await _accountService.RegisterUserAsync(request, origin);
            return Ok(operationResponse);
        }

        [HttpPost]
        [Route("register-role")]
        [ProducesResponseType(typeof(OperationResponse<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> RegisterRoleAsync([FromBody] RegisterRequestRole request)
        {
            var origin = Request.Headers["origin"];
            var operationResponse = await _accountService.RegisterRoleAsync(request, origin);
            return Ok(operationResponse);
        }

        [HttpPost]
        [Route("register-tenant")]
        [ProducesResponseType(typeof(OperationResponse<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> RegisterTenantAsync([FromBody] RegisterRequestTenant request)
        {
            var origin = Request.Headers["origin"];
            var operationResponse = await _accountService.RegisterTenantAsync(request, origin);
            return Ok(operationResponse);
        }

        [HttpGet]
        [Route("confirm-email")]
        [ProducesResponseType(typeof(OperationResponse<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] string userId, [FromQuery] string code)
        {
            var operationResponse = await _accountService.ConfirmEmailAsync(userId, code);
            return Ok(operationResponse);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPasswordRequest model)
        {
            var origin = Request.Headers["origin"];
            await _accountService.ForgotPasswordAsync(model, origin);
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordRequest model)
        {
            await _accountService.ResetPasswordAsync(model);
            return Ok();
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> GetRefreshTokenAsync([FromBody] TokenModel model)
        {
            var ipAddress = IpHelper.GetIpAddress();
            await _accountService.RefreshTokenAsync(model, ipAddress);
            return Ok();
        }
    }
}
