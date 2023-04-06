namespace Identity.API.Domain.Entity
{
    public class RegisterRequestRole
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5, ErrorMessage = "Role Name should be between 5 and 50 charactors long.")]        
        public string RoleName { get; set; } = string.Empty;
    }
}
