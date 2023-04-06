using Newtonsoft.Json;

namespace Identity.API.Filters.ExceptionFilter;

public class HttpExceptionFilter : IExceptionFilter
{
    private readonly IWebHostEnvironment env;
    private readonly ILogger<HttpExceptionFilter> logger;

    public HttpExceptionFilter(IWebHostEnvironment env, ILogger<HttpExceptionFilter> logger)
    {
        this.env = env;
        this.logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        logger.LogError(new EventId(context.Exception.HResult), context.Exception, context.Exception.Message);

        if (context.Exception.GetType() == typeof(ApiException))
        {
            var problemDetails = new ValidationProblemDetails()
            {
                Instance = context.HttpContext.Request.Path,
                Status = StatusCodes.Status400BadRequest,
                Detail = "Please refer to the errors property for additional details."
            };

            problemDetails.Errors.Add("DomainValidations", new string[] { context.Exception.Message.ToString() });

            context.Result = new BadRequestObjectResult(problemDetails);
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        }
        else
        {
            var json = new JsonErrorResponse
            {
                Messages = "An error occured.Try it again."
            };

            if (env.IsDevelopment())
            {
                json.DeveloperMessage = context.Exception;
            }
            context.Result = new InternalServerErrorObjectResult(JsonConvert.SerializeObject(json));
            
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }
        context.ExceptionHandled = true;
    }

    private class JsonErrorResponse
    {
        public string Messages { get; set; } = String.Empty;
        public object DeveloperMessage { get; set; } = default!;
    }
}

