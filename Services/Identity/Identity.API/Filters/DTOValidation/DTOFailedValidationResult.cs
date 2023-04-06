namespace Identity.API.Filters.DTOValidation
{
    public record DTOFailedValidationResult
    {
        public int StatusCode { get; } = 400;
        public IList<string> ModelValidationErrors { get; }

        public DTOFailedValidationResult(IList<string> modelValidationErrors) => (ModelValidationErrors) = (modelValidationErrors);
    }
}
