using Microsoft.EntityFrameworkCore.Migrations;

namespace MonitorizareVot.Domain.Ong.Migrations
{
    public partial class AddObserverEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Observers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Observers");
        }
    }
}
