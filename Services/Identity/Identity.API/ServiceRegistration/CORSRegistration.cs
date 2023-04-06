namespace Identity.API.ServiceRegistration
{
    public static class CORSRegistration
    {
        public static IServiceCollection AddCORS(this IServiceCollection services)
        {
            var cors = services.BuildServiceProvider().GetRequiredService<IOptions<CORS>>().Value;
            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowedOrigins", builder => builder
                    .WithOrigins(cors.AllowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader());

                options.AddPolicy("AllowAnyOrigin", builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());

                options.AddPolicy("CustomPolicy", builder => builder
                    .AllowAnyOrigin()
                    .WithMethods("Get")
                    .WithHeaders("Content-Type"));
            });

            return services;
        }
    }
}
