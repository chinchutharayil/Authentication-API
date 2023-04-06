namespace Identity.API.Domain.Entity
{
    public class RegisterRequestUser
    {
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5, ErrorMessage = "First Name should be between 5 and 50 charactors long.")]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 5, ErrorMessage = "Last Name should be between 5 and 50 charactors long.")]
        public string LastName { get; set; } = string.Empty;
        
        public int EmpID { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Entered text is not a valid Email Address.")]
        public string? Email { get; set; }

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 8, ErrorMessage = "USername should be between 5 and 50 charactors long.")]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 8, ErrorMessage = "Password should be between 5 and 50 charactors long.")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password", ErrorMessage = "Passwords entered are not matching.")]
        public string ConfirmPassword { get; set; } = string.Empty;        

        [Required]
        public List<string> Roles { get; set; } = new();
        
        [Required]
        public List<string> Tenants { get; set; } = new();


    }
}
