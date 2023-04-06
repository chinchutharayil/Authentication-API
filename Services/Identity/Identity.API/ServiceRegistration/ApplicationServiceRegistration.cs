namespace Identity.API.ServiceRegistration
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddTransientServices(this IServiceCollection services)
        {
            services.AddTransient<IAccountService, AccountService>();            
            return services;
        }

        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();            
            return services;            
        }

        public static IServiceCollection AddSingletonServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IDateTimeService, DateTimeService>();
            return services;            
        }
    }
}
