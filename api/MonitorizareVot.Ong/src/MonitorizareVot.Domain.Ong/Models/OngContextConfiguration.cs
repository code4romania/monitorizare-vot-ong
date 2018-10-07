using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace MonitorizareVot.Domain.Ong.Models
{
    /// <summary>
    ///  used only on migrations
    /// </summary>
    public class OngContextConfiguration : IDesignTimeDbContextFactory<OngContext>
    {
        public OngContext CreateDBContext(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<OngContext>();
            builder.UseSqlServer(Startup.RegisterConfiguration().GetConnectionString("DefaultConnection"));
            return new OngContext(builder.Options);
        }

        public OngContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<OngContext>();
            builder.UseSqlServer(Startup.RegisterConfiguration().GetConnectionString("DefaultConnection"));
            return new OngContext(builder.Options);
        }
    }
}
