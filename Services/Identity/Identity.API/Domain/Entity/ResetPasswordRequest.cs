namespace Identity.API.Domain.Entity
{
    public class ResetPasswordRequest
    {
        [Required]        
        public string UserName { get; set; } = string.Empty;
        
        [Required]
        public string Token { get; set; } = string.Empty;
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        [Compare("Password", ErrorMessage = "Passwords entered are not matching.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
