namespace Identity.API.Domain.AppSettings
{
    public class AppSettings
    {
        public ApplicationDetail ApplicationDetail { get; set; } = new();
        public JWTSettings JWTSettings { get; set; } = new();
    }
}
