namespace Identity.API.Domain.Entity.Models.Interfaces
{
    public interface IHaskey<T>
    {
        T Id { get; set; }
    }
}
