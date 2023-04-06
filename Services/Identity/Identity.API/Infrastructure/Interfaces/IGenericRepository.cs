namespace Identity.API.Infrastructure.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {

        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);        
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size);
        Task<T> GetByIdAsync(int id);
        Task<T> GetOneAsync(Expression<Func<T, bool>> predicate);       
        Task<IEnumerable<T>> GetManyAsync(Expression<Func<T, bool>>? filter,
                                          Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = default,
                                          int? top = default,
                                          int? skip = default,
                                          params Expression<Func<T, object>>[] includes);
        Task<IEnumerable<T>> GetManyIncludePropertiesByNameAsync(Expression<Func<T, bool>>? filter,
                                          Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = default,
                                          int? top = default,
                                          int? skip = default,
                                          params string[] includeProperties);
    }    
}
