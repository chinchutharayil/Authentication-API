namespace Identity.API.Infrastructure
{
    /// <summary>
    /// Encapsulates all repository transactions.
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        #region Constructor
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="context">The Database Context</param>
        public UnitOfWork(IdentityContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        #endregion

        #region Properties
        protected readonly IdentityContext _context;       

        private GenericRepository<RefreshToken>? _refreshTokenRepository;
        public IGenericRepository<RefreshToken> RefreshTokenRepository => _refreshTokenRepository ?? (_refreshTokenRepository = new GenericRepository<RefreshToken>(_context));

        private GenericRepository<Tenant>? _tenantRepository;
        public IGenericRepository<Tenant> TenantRepository => _tenantRepository ?? (_tenantRepository = new GenericRepository<Tenant>(_context));

        private GenericRepository<UserTenant>? _userTenantRepository;
        public IGenericRepository<UserTenant> UserTenantRepository => _userTenantRepository ?? (_userTenantRepository = new GenericRepository<UserTenant>(_context));
        #endregion

        /// <summary>
        /// Completes the unit of work, saving all repository changes to the underlying data-store.
        /// </summary>
        /// <returns><see cref="Task"/></returns>
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();            
            ////try
            ////{
            ////    await _context.SaveChangesAsync();
            ////}
            ////catch (DbUpdateException e)
            ////{ 
            ////    //Should Manage Excepton Here
            ////}

        } 

        #region Implements IDisposable
        #region fields
        private bool _disposed;
        #endregion

        /// <summary>
        /// Cleans up any resources being used.
        /// </summary>
        /// <returns><see cref="ValueTask"/></returns>
        public async ValueTask DisposeAsync()
        {
            await DisposeAsync(true);

            // Take this object off the finalization queue to prevent 
            // finalization code for this object from executing a second time.
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Cleans up any resources being used.
        /// </summary>
        /// <param name="disposing">Whether or not we are disposing</param>
        /// <returns><see cref="ValueTask"/></returns>
        protected virtual async ValueTask DisposeAsync(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // Dispose managed resources.
                    await _context.DisposeAsync();
                }

                // Dispose any unmanaged resources here...

                _disposed = true;
            }
        }
        #endregion
    }
}
