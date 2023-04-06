using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Identity.API.Migrations.Identity
{
    public partial class IdentityContextCommit8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "Identity",
                table: "Tenant",
                type: "datetime",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "Identity",
                table: "Tenant",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldDefaultValueSql: "GETUTCDATE()");
        }
    }
}
