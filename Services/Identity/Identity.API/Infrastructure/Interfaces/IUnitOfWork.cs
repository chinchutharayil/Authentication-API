

namespace Identity.API.Infrastructure.Interfaces
{
    public interface IUnitOfWork : IAsyncDisposable
    {
        #region Properties

        IGenericRepository<RefreshToken> RefreshTokenRepository { get; }
        IGenericRepository<Tenant> TenantRepository { get; }
        IGenericRepository<UserTenant> UserTenantRepository { get; }
        
        #endregion

        #region Methods

        Task CompleteAsync();

        #endregion
    }
}
