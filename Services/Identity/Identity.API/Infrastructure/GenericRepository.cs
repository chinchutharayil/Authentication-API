using Identity.API.Infrastructure.Interfaces;

namespace Identity.API.Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly IdentityContext _context;
        protected DbSet<T> _dbSet;

        #region Constructor

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="context">The Database Context</param>
        public GenericRepository(IdentityContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        #endregion

        #region Methods
        /// <summary>
        /// Adds an entity.
        /// </summary>
        /// <param name="entity">The entity to add</param>
        /// <returns>The entity that was added</returns>
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);            
            return entity;
        }

        /// <summary>
        /// Deletes entities based on a condition.
        /// </summary>
        /// <param name="filter">The condition the entities must fulfil to be deleted</param>
        /// <returns><see cref="Task"/></returns>
        public Task UpdateAsync(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            return Task.CompletedTask;
        }        

        /// <summary>
        /// Deletes an entity.
        /// </summary>
        /// <param name="entity">The entity to delete</param>
        /// <returns><see cref="Task"/></returns>
        public Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return Task.CompletedTask;
        }        

        /// <summary>
        /// Gets a collection of all entities.
        /// </summary>
        /// <returns>A collection of all entities</returns>
        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        /// <summary>
        /// Gets a collection of all entities by the page number and page size.
        /// </summary>
        /// <param name="page">The page number for which the collection of entities are collected</param>
        /// <param name="size">The page size or the number of records collected of the entity</param>
        /// <returns>A collection of all entities</returns>
        public async Task<IReadOnlyList<T>> GetPagedReponseAsync(int page, int size)
        {
            return await _dbSet.Skip((page - 1) * size).Take(size).AsNoTracking().ToListAsync();
        }

        /// <summary>
        /// Gets an entity by ID.
        /// </summary>
        /// <param name="id">The ID of the entity to retrieve</param>
        /// <returns>The entity object if found, otherwise null</returns>
        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }        

        /// <summary>
        /// Gets a collection of entities based on the specified criteria.
        /// </summary>
        /// <param name="filter">The condition the entities must fulfil to be returned</param>
        /// <param name="orderBy">The function used to order the entities</param>
        /// <param name="top">The number of records to limit the results to</param>
        /// <param name="skip">The number of records to skip</param>
        /// <param name="includeProperties">Any other navigation properties to include when returning the collection</param>
        /// <returns>A collection of entities</returns>
        public async Task<IEnumerable<T>> GetManyIncludePropertiesByNameAsync(
            Expression<Func<T, bool>>? filter = default,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = default,
            int? top = default,
            int? skip = default,
            params string[] includeProperties)
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties.Length > 0)
            {
                query = includeProperties.Aggregate(query, (theQuery, theInclude) => theQuery.Include(theInclude));
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (skip.HasValue)
            {
                query = query.Skip(skip.Value);
            }

            if (top.HasValue)
            {
                query = query.Take(top.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetManyAsync(
            Expression<Func<T, bool>>? filter = default,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = default,
            int? top = default,
            int? skip = default,
            params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includes != null)
            {
                query = query.IncludeMultiple(includes);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (skip.HasValue)
            {
                query = query.Skip(skip.Value);
            }

            if (top.HasValue)
            {
                query = query.Take(top.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<T> GetOneAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(predicate).FirstOrDefaultAsync();            
        }       


        //public async Task<bool> SaveChangesAsync()
        //{
        //    await _context.SaveChangesAsync();
        //    return true;
        //}
        #endregion
    }
}
