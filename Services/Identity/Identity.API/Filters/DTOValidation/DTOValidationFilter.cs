namespace Identity.API.Filters.DTOValidation
{
    public class DTOValidationFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var modelValidationErrors = context.ModelState
                        .Values
                        .SelectMany(v => v.Errors.Select(b => b.ErrorMessage))
                        .ToList();
                var dtoFailedValidationResult = new DTOFailedValidationResult(modelValidationErrors);
                context.Result = new JsonResult(dtoFailedValidationResult) { StatusCode = 400 };
            }
        }
    }
}
