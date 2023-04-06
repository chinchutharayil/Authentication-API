namespace Identity.API.Domain.Entity.Models
{
    public class UserTenant : AuditableEntity
    {
        public int UserId { get; set; }
        public int TenantId { get; set; }

        public ApplicationUser? User { get; set; }
        public Tenant? Tenant { get; set; }
    }
}
