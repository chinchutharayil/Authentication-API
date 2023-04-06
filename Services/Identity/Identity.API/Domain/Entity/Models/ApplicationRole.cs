namespace Identity.API.Domain.Entity.Models
{
    public class ApplicationRole : IdentityRole<int>
    {
        public virtual int Status { get; set; }
        public virtual int CreatedBy { get; set; }
        public virtual int? LastModifiedBy { get; set; }
        public virtual DateTime CreatedWhen { get; set; }
        public virtual DateTime? LastModifiedWhen { get; set; }
    }
}
