namespace Identity.API.Domain.Entity.Models
{
    public class AuditableEntity
    {
        public int CreatedBy { get; set; }        
        public DateTime CreatedDate { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }
    }
}
