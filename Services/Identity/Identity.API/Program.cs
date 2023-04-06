var configuration = GetConfiguration();
Log.Logger = CreateSerilogLogger(configuration);

try
{
    
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    //ConfigurationManager configuration = builder.Configuration;

    //configuration.SetBasePath(Directory.GetCurrentDirectory())
    //             .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    //             .AddJsonFile($"appsettings.Development.json", optional: true)
    //             .AddEnvironmentVariables();


    // Add services to the container.
    IServiceCollection services = builder.Services;
    var environment = builder.Environment;


    services.ConfigureJWTSettings(configuration);
    services.ConfigureApplicationDetail(configuration);
    services.ConfigureCors(configuration);
    services.RegisterIdentityServices(configuration);

    services.AddSingletonServices();
    services.AddScopedServices();
    services.AddTransientServices();

    services.AddControllers(configure =>
    {
        configure.Filters.Add(typeof(HttpExceptionFilter));
        configure.Filters.Add(typeof(DTOValidationFilter));
    })
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.WriteIndented = true;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        });
    
    //services.AddControllersWithViews();
    //services.AddRazorPages();     

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    services.AddEndpointsApiExplorer();
    services.AddSwagger();

    services.AddCORS();
    services.AddHealthChecks(configuration);

    services.Configure<ApiBehaviorOptions>(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    });    

    var app = builder.Build();
    
    Log.Information("Configuring web host ({ApplicationContext})...", AppName);
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {        
        app.UseSwagger();
     
        app.UseSwaggerUI(setupAction =>
        {
           setupAction.SwaggerEndpoint("/swagger/OpenAPISpecification/swagger.json", "JWT Access Token with refresh Token");
        });
        app.UseDeveloperExceptionPage();
    }

    //1. HTTPS Redirection Middleware (UseHttpsRedirection) redirects HTTP requests to HTTPS.
    //2. Static File Middleware (UseStaticFiles) returns static files and short-circuits further request processing.
    //3. Cookie Policy Middleware (UseCookiePolicy) conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
    //4. Routing Middleware(UseRouting) to route requests.
    //5. Authentication Middleware(UseAuthentication) attempts to authenticate the user before they're allowed access to secure resources.
    //6. Authorization Middleware (UseAuthorization) authorizes a user to access secure resources.
    //7. Session Middleware (UseSession) establishes and maintains session state. If the app uses session state, call Session Middleware after Cookie Policy Middleware and before MVC Middleware.
    //8. Endpoint Routing Middleware (UseEndpoints with MapRazorPages) to add Razor Pages endpoints to the request pipeline.

    app.UseHttpsRedirection();

    app.UseStaticFiles();

    //app.UseCookiePolicy();

    app.UseRouting();

    // app.UseRequestLocalization();

    var CORS = app.Services.GetRequiredService<IOptions<CORS>>().Value;
    app.UseCors(CORS.AllowAnyOrigin ? "AllowAnyOrigin" : "AllowedOrigins");

    //app.UseCors(options =>
    //             options.WithOrigins("https://localhost:3000", "https://localhost:3001", "https://localhost:3002")
    //             //.AllowAnyOrigin() we dont allow request from all origins, rather only allow requests from certain domains.
    //             .AllowAnyHeader()
    //             .AllowAnyMethod());

    app.UseAuthentication();

    app.UseAuthorization();

    //app.ConfigureSwagger();
    //app.ConfigureHealthCheck();

    // app.UseSession();
    // app.UseResponseCompression();
    // app.UseResponseCaching();

    //We are not using app.MapControllers() middleware and rather we use app.UseEndpoints()
    //app.MapControllers();  
    //app.MapRazorPages();

    ////app.UseHealthChecks("/hc", new HealthCheckOptions
    ////{
    ////    Predicate = _ => true,
    ////    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,
    ////    ResultStatusCodes =
    ////                {
    ////                    [HealthStatus.Healthy] = StatusCodes.Status200OK,
    ////                    [HealthStatus.Degraded] = StatusCodes.Status500InternalServerError,
    ////                    [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable,
    ////                },
    ////});
    ////app.UseHealthChecks("/liveness", new HealthCheckOptions
    ////{
    ////    Predicate = r => r.Name.Contains("Self")
    ////})   

    ////.UseHealthChecksUI(setup =>
    ////        {
    ////            setup.ApiPath = "/healthcheck";
    ////            setup.UIPath = "/healthcheck-ui";
    ////        });

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapDefaultControllerRoute();
        endpoints.MapControllers();

        endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
        {
            Predicate = _ => true,
            ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse,
            ResultStatusCodes =
            {
            [HealthStatus.Healthy] = StatusCodes.Status200OK,
            [HealthStatus.Degraded] = StatusCodes.Status500InternalServerError,
            [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable,
            }
        });
        endpoints.MapHealthChecks("/liveness", new HealthCheckOptions
        {
            Predicate = r => r.Name.Contains("self")
        });
        endpoints.MapHealthChecksUI(setup =>
        {
            setup.ApiPath = "/healthcheck";
            setup.UIPath = "/healthcheck-ui";
            //setup.AddCustomStylesheet("Customization/custom.css");
        });       
    });
    Log.Information("Starting web host ({ApplicationContext})...", AppName);
    app.Run();
    return 0;
}
catch (Exception ex)
{
    Log.Fatal(ex, "Program terminated unexpectedly ({ApplicationContext})!", AppName);
    return 1;
}
finally
{
    Log.CloseAndFlush();
}


IConfiguration GetConfiguration()
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.Development.json", optional: true)
        .AddEnvironmentVariables();    
    return builder.Build();
}

Serilog.ILogger CreateSerilogLogger(IConfiguration configuration)
{
    var assemblyName = Assembly.GetEntryAssembly()?.GetName().Name;
    var logStashFolder = configuration["Serilog:logStashFolder"];
    var logFile = configuration["Serilog:logFile"];
    var logPath = Path.Combine(Directory.GetCurrentDirectory(), logStashFolder);
    logFile = Path.Combine(logPath, logFile);
    //var instrumentationKey = configuration["ApplicationInsights:InstrumentationKey"];    

    if (!Directory.Exists(logPath)) Directory.CreateDirectory(logPath);

    return new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .MinimumLevel.Verbose()
        .Enrich.WithProperty("Assembly", AppName)
        .Enrich.FromLogContext()        
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Literate)        
        .WriteTo.File(path: logFile, outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} {CorrelationId} {Level:u3}] {Username} {Message:lj}{NewLine}{Exception}", rollingInterval: RollingInterval.Day)
        //.WriteTo.Http(string.IsNullOrWhiteSpace(logstashUrl) ? "http://localhost:8080" : logstashUrl, 1000)
        //below code will be using when logging to ApplicationInsights using instrumentationKey
        //.WriteTo.Logger(lc => lc.Filter.ByExcluding(Matching.WithProperty<bool>("Security", p => p))
        //.WriteTo.ApplicationInsights(new TelemetryConfiguration { InstrumentationKey = instrumentationKey }, new CustomApplicationInsightsTelemetryConverter()))
        .CreateLogger();
}

public partial class Program
{    
    public static string Namespace = typeof(Program).Namespace ?? "Identity.API";
    public static string AppName = Namespace.Substring(Namespace.LastIndexOf('.', Namespace.LastIndexOf('.') - 1) + 1);    
}