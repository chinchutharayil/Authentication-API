namespace Identity.API.ServiceRegistration
{
    public static class HealthChecksregistration
    {
        public static IServiceCollection AddHealthChecks(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHealthChecks()
                .AddCheck("Self", () => HealthCheckResult.Healthy())
                .AddDbContextCheck<IdentityContext>(name: "Identity EF Health-Check", failureStatus: HealthStatus.Degraded)
                .AddSqlServer(configuration.GetConnectionString("IdentityConnection"), name: "Identity Database Health-Check", tags: new string[] { "IdentityManager" });            

            services.AddHealthChecksUI(setupSettings: setup =>
            {
                setup.AddHealthCheckEndpoint("Identity API Health Checks", $"/hc");
            }).AddInMemoryStorage();
            return services;
        }
    }
}
