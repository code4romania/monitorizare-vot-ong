using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace MonitorizareVot.Domain.Ong.Models
{
    /// <summary>
    ///  used only on migrations
    /// </summary>
    public class VoteMonitorContextConfiguration : IDesignTimeDbContextFactory<VoteMonitorContext>
    {
        public VoteMonitorContext CreateDBContext(DbContextFactoryOptions options)
        {
            var builder = new DbContextOptionsBuilder<VoteMonitorContext>();
            builder.UseSqlServer(Startup.RegisterConfiguration().GetConnectionString("DefaultConnection"));
            return new VoteMonitorContext(builder.Options);
        }

        public VoteMonitorContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<VoteMonitorContext>();
            builder.UseSqlServer(Startup.RegisterConfiguration().GetConnectionString("DefaultConnection"));
            return new VoteMonitorContext(builder.Options);
        }
    }
}
