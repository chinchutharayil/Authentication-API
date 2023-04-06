namespace Identity.API.Domain.Entity.Models
{
    public class Tenant : BaseEntity<int>
    {
        public string TenantName { get; set; } = string.Empty;
        public int Status { get; set; }
    }
}
