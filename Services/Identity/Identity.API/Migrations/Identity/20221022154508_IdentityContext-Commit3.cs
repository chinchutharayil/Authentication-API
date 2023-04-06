using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Identity.API.Migrations.Identity
{
    public partial class IdentityContextCommit3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTenants_Tenants_TenantId",
                schema: "Identity",
                table: "UserTenants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tenants",
                schema: "Identity",
                table: "Tenants");

            migrationBuilder.RenameTable(
                name: "Tenants",
                schema: "Identity",
                newName: "Tenant",
                newSchema: "Identity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastModifiedWhen",
                schema: "Identity",
                table: "Role",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedWhen",
                schema: "Identity",
                table: "Role",
                type: "datetime",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastModifiedDate",
                schema: "Identity",
                table: "Tenant",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "Identity",
                table: "Tenant",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tenant",
                schema: "Identity",
                table: "Tenant",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTenants_Tenant_TenantId",
                schema: "Identity",
                table: "UserTenants",
                column: "TenantId",
                principalSchema: "Identity",
                principalTable: "Tenant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTenants_Tenant_TenantId",
                schema: "Identity",
                table: "UserTenants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tenant",
                schema: "Identity",
                table: "Tenant");

            migrationBuilder.RenameTable(
                name: "Tenant",
                schema: "Identity",
                newName: "Tenants",
                newSchema: "Identity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastModifiedWhen",
                schema: "Identity",
                table: "Role",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedWhen",
                schema: "Identity",
                table: "Role",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldDefaultValueSql: "GETUTCDATE()");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastModifiedDate",
                schema: "Identity",
                table: "Tenants",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "Identity",
                table: "Tenants",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tenants",
                schema: "Identity",
                table: "Tenants",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTenants_Tenants_TenantId",
                schema: "Identity",
                table: "UserTenants",
                column: "TenantId",
                principalSchema: "Identity",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
