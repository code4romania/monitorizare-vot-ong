using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace MonitorizareVot.Domain.Ong.Models
{
    /// <summary>
    ///  used only on migrations
    /// </summary>
    public class OngContextConfiguration : IDbContextFactory<OngContext>
    {
        public OngContext Create(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<OngContext>();
            builder.UseSqlServer(Startup.RegisterConfiguration().GetConnectionString("DefaultConnection"));
            return new OngContext(builder.Options);
        }
    }
}
