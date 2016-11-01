using Microsoft.EntityFrameworkCore;
using System;

namespace MonitorizareVot.Ong.Api.Tests
{
    public class DatabaseFixture<TDbContext> : IDisposable where TDbContext : DbContext
    {
        private TDbContext _context;

        public DatabaseFixture(TDbContext context)
        {
            _context = context;
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
        }
    }
}
