namespace Identity.API.Domain.Entity
{
    public class AuthenticationRequest
    {
        [Required]
        [StringLength(maximumLength:50, MinimumLength = 5, ErrorMessage = "User Name should be between 5 and 50 charactors long.")]        
        public string UserName { get; set; } = string.Empty;
        
        [StringLength(maximumLength: 50, MinimumLength = 8, ErrorMessage = "Password should be between 5 and 50 charactors long.")]        
        public string Password { get; set; } = string.Empty;
    }
}
