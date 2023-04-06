namespace Identity.API.Data
{
    public class IdentityContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public const string DEFAULT_SCHEMA = "Identity";

        public DbSet<Tenant> Tenants { get; set; } = default!;
        public DbSet<RefreshToken> RefreshTokens { get; set; } = default!;
        public DbSet<UserTenant> UserTenants { get; set; } = default!;

        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        { 
        }

        public virtual async Task<int> SaveChangesAsync(string userId)
        {            
            var result = await base.SaveChangesAsync();            
            return result;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder
            //    .UseSqlServer("DataSource=app.db");
            //}
            //optionsBuilder.UseExceptionProcessor();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema(DEFAULT_SCHEMA);

            #region Custom Identity table names
            
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.Property(e => e.UserName).HasMaxLength(50);
                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);
                entity.Property(e => e.PhoneNumber).HasMaxLength(50);                
                entity.Property(e => e.PasswordHash).HasColumnName("Password");
                entity.Property(e => e.CreatedWhen).HasColumnName("UserAddedWhen").HasDefaultValueSql("GETUTCDATE()");                                
                entity.HasKey(e => e.Id);
                entity.ToTable(name: "User");
                //entity.HasMany(e => e.RefreshTokens).WithOne(r => r.User).HasForeignKey(r => r.UserId);
            });

            builder.Entity<ApplicationRole>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.CreatedWhen).HasColumnType("datetime").HasDefaultValueSql("GETUTCDATE()");
                entity.Property(e => e.LastModifiedWhen).HasColumnType("datetime");
                entity.ToTable(name:"Role");
            });

            builder.Entity<IdentityUserRole<int>>(entity =>
            {
                entity.HasKey(entity => new { entity.UserId, entity.RoleId });
                entity.ToTable(name:"UserRoles");
            });

            builder.Entity<IdentityUserClaim<int>>(entity =>
            {
                entity.ToTable(name: "UserClaims");
            });

            builder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.ToTable(name: "UserLogins");
            });

            builder.Entity<IdentityRoleClaim<int>>(entity =>
            {
                entity.ToTable(name: "RoleClaims");
            });            

            builder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.ToTable(name: "UserTokens");
            });

            builder.Entity<RefreshToken>(entity =>
            {                
                entity.HasOne(e=>e.User)
                      .WithMany(u=>u.RefreshTokens)
                      .HasForeignKey(e=>e.UserId);                
                entity.Property(e => e.Expires).HasColumnType("datetime");
                entity.Property(e => e.Created).HasColumnType("datetime");
                entity.Property(e => e.Revoked).HasColumnType("datetime");
                entity.Property(e => e.RevokedByIp).HasMaxLength(100);
                entity.ToTable(name: "RefreshToken");               
                //entity.ToTable(name: "RefreshToken", tableBuilder => tableBuilder.ExcludeFromMigrations());
            });

            builder.Entity<UserTenant>(entity=>
            {
                entity.HasKey(entity=> new { entity.UserId, entity.TenantId });
                entity.HasOne(e=>e.User).WithMany(u=>u.UserTenants).HasForeignKey(e=>e.UserId);
                entity.HasOne(e => e.Tenant).WithMany().HasForeignKey(e => e.TenantId);                
            });

            builder.Entity<Tenant>().Property(e => e.TenantName).HasMaxLength(50);
            builder.Entity<Tenant>().Property(p => p.CreatedDate).HasColumnType("datetime").HasDefaultValueSql("GETUTCDATE()");
            builder.Entity<Tenant>().Property(p => p.LastModifiedDate).HasColumnType("datetime");
            builder.Entity<Tenant>().Property(e => e.LastModifiedBy);            
            builder.Entity<Tenant>().ToTable(name: "Tenant");
            
            //builder.Seed();            
            #endregion
        }
    }
}
