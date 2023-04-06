namespace Identity.API.ServiceRegistration
{
    public static class SwaggerOpenAPIRegistration
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("OpenAPISpecification", new OpenApiInfo
                {
                    Title = "Nabina Group - Identity Provider HTTP API",
                    Version = "v1",
                    Description = "User Management Service HTTP API"

                });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'"
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                        }
                      //new OpenApiSecurityScheme
                      //{
                      //  Reference = new OpenApiReference
                      //    {
                      //      Type = ReferenceType.SecurityScheme,
                      //      Id = "Bearer"
                      //    },
                      //    Scheme = "oauth2",
                      //    Name = "Bearer",
                      //    In = ParameterLocation.Header,
                      //  }
                      , new List<string>()
                    },
                });
            });

            return services;
        }
    }
}
