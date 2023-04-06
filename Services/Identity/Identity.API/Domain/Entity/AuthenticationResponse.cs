namespace Identity.API.Domain.Entity
{
    public class AuthenticationResponse
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string? Email { get; set; }
        public List<string> Roles { get; set; } = new();
        public List<string> Tenants { get; set; } = new();
        public bool IsVerified { get; set; }
        public string JWToken { get; set; } = string.Empty;
        [JsonIgnore]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
