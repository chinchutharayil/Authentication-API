namespace Identity.API.Domain.AppSettings
{
    public class CORS
    {
        public bool AllowAnyOrigin { get; set; }
        public string[] AllowedOrigins { get; set; } = { };
    }

    public class CORSValidation : IValidateOptions<CORS>
    {
        public ValidateOptionsResult Validate(string name, CORS options)
        {
            if (options.AllowAnyOrigin && options.AllowedOrigins.Length == 0 )
            {
                return ValidateOptionsResult.Fail($"{nameof(options.AllowedOrigins)} configuration parameter for the CORS is required");
            }
            return ValidateOptionsResult.Success;
        }
    }
}
