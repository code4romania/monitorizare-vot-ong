using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class OngContext : DbContext
    {
        public OngContext(DbContextOptions<OngContext> options)
            :base(options)
        {

        }
    }
}