

namespace Identity.API.ServiceRegistration
{
    public static class ConfigureAppSettings
    {
        public static IServiceCollection ConfigureJWTSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<JWTSettings>(configuration.GetSection("JwtSettings"));
            services.AddSingleton<IValidateOptions<JWTSettings>, JWTSettingsValidation>();
            return services;
        }

        public static IServiceCollection ConfigureApplicationDetail(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<ApplicationDetail>(configuration.GetSection("ApplicationDetail"));                        
            return services;
        }

        public static IServiceCollection ConfigureCors(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<CORS>(configuration.GetSection("CORS"));
            services.AddSingleton<IValidateOptions<CORS>, CORSValidation>();
            return services;
        }        
    }
}
