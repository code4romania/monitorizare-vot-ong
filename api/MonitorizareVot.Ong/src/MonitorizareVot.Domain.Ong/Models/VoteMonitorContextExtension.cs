using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class VoteMonitorContext : DbContext
    {
        public VoteMonitorContext(DbContextOptions<VoteMonitorContext> options)
            :base(options)
        {

        }
    }
}