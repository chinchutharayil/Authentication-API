IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF SCHEMA_ID(N'Identity') IS NULL EXEC(N'CREATE SCHEMA [Identity];');
GO

CREATE TABLE [Identity].[Role] (
    [Id] int NOT NULL IDENTITY,
    [Status] int NOT NULL,
    [CreatedBy] int NOT NULL,
    [LastModifiedBy] int NULL,
    [CreatedWhen] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
    [LastModifiedWhen] datetime2 NULL,
    [Name] nvarchar(256) NULL,
    [NormalizedName] nvarchar(256) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Identity].[Tenants] (
    [Id] int NOT NULL IDENTITY,
    [TenantName] nvarchar(max) NOT NULL,
    [Status] int NOT NULL,
    [CreatedBy] int NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [LastModifiedBy] int NOT NULL,
    [LastModifiedDate] datetime2 NULL,
    CONSTRAINT [PK_Tenants] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Identity].[User] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [Status] int NOT NULL,
    [EmpID] int NULL,
    [CreatedBy] int NOT NULL,
    [LastModifiedBy] int NULL,
    [UserAddedWhen] datetime2 NOT NULL DEFAULT (GETUTCDATE()),
    [LastModifiedWhen] datetime2 NULL,
    [UserName] nvarchar(256) NULL,
    [NormalizedUserName] nvarchar(256) NULL,
    [Email] nvarchar(256) NULL,
    [NormalizedEmail] nvarchar(256) NULL,
    [EmailConfirmed] bit NOT NULL,
    [Password] nvarchar(max) NULL,
    [SecurityStamp] nvarchar(max) NULL,
    [ConcurrencyStamp] nvarchar(max) NULL,
    [PhoneNumber] nvarchar(max) NULL,
    [PhoneNumberConfirmed] bit NOT NULL,
    [TwoFactorEnabled] bit NOT NULL,
    [LockoutEnd] datetimeoffset NULL,
    [LockoutEnabled] bit NOT NULL,
    [AccessFailedCount] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Identity].[RoleClaims] (
    [Id] int NOT NULL IDENTITY,
    [RoleId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_RoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RoleClaims_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Identity].[Role] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[RefreshToken] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [Token] nvarchar(max) NULL,
    [Expires] datetime2 NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedByIp] nvarchar(max) NOT NULL,
    [Revoked] datetime2 NULL,
    [RevokedByIp] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_RefreshToken] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RefreshToken_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[UserClaims] (
    [Id] int NOT NULL IDENTITY,
    [UserId] int NOT NULL,
    [ClaimType] nvarchar(max) NULL,
    [ClaimValue] nvarchar(max) NULL,
    CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserClaims_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[UserLogins] (
    [LoginProvider] nvarchar(450) NOT NULL,
    [ProviderKey] nvarchar(450) NOT NULL,
    [ProviderDisplayName] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_UserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_UserLogins_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[UserRoles] (
    [UserId] int NOT NULL,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRoles_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Identity].[Role] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRoles_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[UserTenants] (
    [UserId] int NOT NULL,
    [TenantId] int NOT NULL,
    [CreatedBy] int NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [LastModifiedBy] int NOT NULL,
    [LastModifiedDate] datetime2 NULL,
    CONSTRAINT [PK_UserTenants] PRIMARY KEY ([UserId], [TenantId]),
    CONSTRAINT [FK_UserTenants_Tenants_TenantId] FOREIGN KEY ([TenantId]) REFERENCES [Identity].[Tenants] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserTenants_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [Identity].[UserTokens] (
    [UserId] int NOT NULL,
    [LoginProvider] nvarchar(450) NOT NULL,
    [Name] nvarchar(450) NOT NULL,
    [Value] nvarchar(max) NULL,
    CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_UserTokens_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [Identity].[User] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_RefreshToken_UserId] ON [Identity].[RefreshToken] ([UserId]);
GO

CREATE UNIQUE INDEX [RoleNameIndex] ON [Identity].[Role] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
GO

CREATE INDEX [IX_RoleClaims_RoleId] ON [Identity].[RoleClaims] ([RoleId]);
GO

CREATE INDEX [EmailIndex] ON [Identity].[User] ([NormalizedEmail]);
GO

CREATE UNIQUE INDEX [UserNameIndex] ON [Identity].[User] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
GO

CREATE INDEX [IX_UserClaims_UserId] ON [Identity].[UserClaims] ([UserId]);
GO

CREATE INDEX [IX_UserLogins_UserId] ON [Identity].[UserLogins] ([UserId]);
GO

CREATE INDEX [IX_UserRoles_RoleId] ON [Identity].[UserRoles] ([RoleId]);
GO

CREATE INDEX [IX_UserTenants_TenantId] ON [Identity].[UserTenants] ([TenantId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221020092648_Initial-Commit-Application', N'6.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[RefreshToken]') AND [c].[name] = N'Revoked');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[RefreshToken] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Identity].[RefreshToken] ALTER COLUMN [Revoked] datetime NULL;
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[RefreshToken]') AND [c].[name] = N'Expires');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[RefreshToken] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Identity].[RefreshToken] ALTER COLUMN [Expires] datetime NOT NULL;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[RefreshToken]') AND [c].[name] = N'Created');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[RefreshToken] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [Identity].[RefreshToken] ALTER COLUMN [Created] datetime NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221022141907_IdentityContext-Commit2', N'6.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Identity].[UserTenants] DROP CONSTRAINT [FK_UserTenants_Tenants_TenantId];
GO

ALTER TABLE [Identity].[Tenants] DROP CONSTRAINT [PK_Tenants];
GO

EXEC sp_rename N'[Identity].[Tenants]', N'Tenant';
GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[Role]') AND [c].[name] = N'LastModifiedWhen');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[Role] DROP CONSTRAINT [' + @var3 + '];');
ALTER TABLE [Identity].[Role] ALTER COLUMN [LastModifiedWhen] datetime NULL;
GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[Role]') AND [c].[name] = N'CreatedWhen');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[Role] DROP CONSTRAINT [' + @var4 + '];');
ALTER TABLE [Identity].[Role] ALTER COLUMN [CreatedWhen] datetime NOT NULL;
ALTER TABLE [Identity].[Role] ADD DEFAULT (GETUTCDATE()) FOR [CreatedWhen];
GO

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[Tenant]') AND [c].[name] = N'LastModifiedDate');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[Tenant] DROP CONSTRAINT [' + @var5 + '];');
ALTER TABLE [Identity].[Tenant] ALTER COLUMN [LastModifiedDate] datetime NULL;
GO

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Identity].[Tenant]') AND [c].[name] = N'CreatedDate');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Identity].[Tenant] DROP CONSTRAINT [' + @var6 + '];');
ALTER TABLE [Identity].[Tenant] ALTER COLUMN [CreatedDate] datetime NOT NULL;
GO

ALTER TABLE [Identity].[Tenant] ADD CONSTRAINT [PK_Tenant] PRIMARY KEY ([Id]);
GO

ALTER TABLE [Identity].[UserTenants] ADD CONSTRAINT [FK_UserTenants_Tenant_TenantId] FOREIGN KEY ([TenantId]) REFERENCES [Identity].[Tenant] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20221022154508_IdentityContext-Commit3', N'6.0.3');
GO

COMMIT;
GO

