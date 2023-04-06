namespace Identity.API.Domain.Entity.Models
{
    public class BaseEntity<T> : AuditableEntity, IHaskey<T>
    {
        public T Id { get; set; } = default!;
    }
}
