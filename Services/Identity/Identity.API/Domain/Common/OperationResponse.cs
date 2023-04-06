namespace Identity.API.Domain.Common
{
    public class OperationResponse
    {
        public OperationResponse()
        {
        }
        public OperationResponse(string message)
        {
            Message = message;
        }

        protected bool _forcedFailedResponse;
        public bool Succeeded => OperationError == null && !_forcedFailedResponse;
        public OperationError? OperationError { get; set; }
        public string? Message { get; set; }

        public OperationResponse SetAsFailureResponse(OperationError operationError)
        {
            OperationError = operationError;
            _forcedFailedResponse = true;
            return this;
        }
    }

    public class OperationResponse<T> : OperationResponse
    {
        public OperationResponse()
        {
        }

        public OperationResponse(T data, string message)
        {
            Message = message;
            Data = data;
        }
        
        public T? Data { get; set; }

        public new OperationResponse<T> SetAsFailureResponse(OperationError operationError)
        {
            base.SetAsFailureResponse(operationError);
            return this;
        }
    }

    public record OperationError
    {
        public string Details { get; }
        public OperationError(string details) => (Details) = (details);
    }
}
