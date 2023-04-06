

namespace Identity.API.Domain.AppSettings
{
    public class JWTSettings
    {        
        public string Key { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public double TokenValidityInMinutes { get; set; }
        public int RefreshTokenValidityInDays { get; set; }
    }

    public class JWTSettingsValidation : IValidateOptions<JWTSettings>
    {
        public ValidateOptionsResult Validate(string name, JWTSettings options)
        {
            if (string.IsNullOrEmpty(options.Key))
            {
                return ValidateOptionsResult.Fail($"{nameof(options.Key)} configuration parameter for the JWT Token is required");
            }

            if (string.IsNullOrEmpty(options.Issuer))
            {
                return ValidateOptionsResult.Fail($"{nameof(options.Issuer)} configuration parameter for the JWT Token is required");
            }

            if (string.IsNullOrEmpty(options.Audience))
            {
                return ValidateOptionsResult.Fail($"{nameof(options.Audience)} configuration parameter for the JWT Token is required");
            }

            if (options.TokenValidityInMinutes == default)
            {
                return ValidateOptionsResult.Fail($"{nameof(options.TokenValidityInMinutes)} configuration parameter for the JWT Token is required");
            }

            if (options.RefreshTokenValidityInDays == default)
            {
                return ValidateOptionsResult.Fail($"{nameof(options.RefreshTokenValidityInDays)} configuration parameter for the JWT Token is required");
            }            

            return ValidateOptionsResult.Success;
        }
    }
}
