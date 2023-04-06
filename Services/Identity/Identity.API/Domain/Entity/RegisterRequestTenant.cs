namespace Identity.API.Domain.Entity
{
    public class RegisterRequestTenant
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5, ErrorMessage = "Tenant Name should be between 5 and 50 charactors long.")]        
        public string TenantName { get; set; } = string.Empty;
    }
}
