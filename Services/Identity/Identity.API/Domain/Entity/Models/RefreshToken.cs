﻿namespace Identity.API.Domain.Entity.Models
{
    public class RefreshToken : IHaskey<int>
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime Created { get; set; }
        public string CreatedByIp { get; set; } = string.Empty;
        public DateTime? Revoked { get; set; }
        public string? RevokedByIp { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;

        public ApplicationUser? User { get; set; }
    }
}
