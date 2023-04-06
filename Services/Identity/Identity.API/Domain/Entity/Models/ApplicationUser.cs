namespace Identity.API.Domain.Entity.Models
{
    public class ApplicationUser : IdentityUser<int>
    {        
        public virtual string FirstName { get; set; } = string.Empty;        
        public virtual string LastName { get; set; } = string.Empty;
        public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
        public virtual int Status { get; set; }
        public virtual int? EmpID { get; set; }        
        public virtual int CreatedBy { get; set; }
        public virtual int? LastModifiedBy { get; set; }
        public virtual DateTime CreatedWhen { get; set; }
        public virtual DateTime? LastModifiedWhen { get; set; }
        public virtual string FullName => $"{FirstName.Trim()} {LastName.Trim()}";

        public bool OwnsToken(string token) => RefreshTokens?.Find(x => x.Token == token && !x.IsExpired) != null;

        public List<UserTenant> UserTenants { get; set; } = new List<UserTenant>();

    }
}
