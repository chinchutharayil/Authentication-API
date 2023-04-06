namespace Identity.API.MiddlewareConfiguration
{
    public static class ConfigureMiddlewares
    {
        public static void ConfigureSwagger(this WebApplication app)
        {
            app.UseSwagger();

            app.UseSwaggerUI(setupAction =>
            {
                setupAction.SwaggerEndpoint("/swagger/OpenAPISpecification/swagger.json", "JWT Access Token with refresh Token");
                setupAction.RoutePrefix = "OpenAPI";
            });
        }

        public static void ConfigureHealthCheck(this WebApplication app)
        {
            app.UseHealthChecks("/hc", new HealthCheckOptions
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,
                ResultStatusCodes =
                            {
                                [HealthStatus.Healthy] = StatusCodes.Status200OK,
                                [HealthStatus.Degraded] = StatusCodes.Status500InternalServerError,
                                [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable,
                            },
            })
            .UseHealthChecksUI(setup =>
                        {
                            setup.ApiPath = "/healthcheck";
                            setup.UIPath = "/healthcheck-ui";
                        });
        }
    }
}
