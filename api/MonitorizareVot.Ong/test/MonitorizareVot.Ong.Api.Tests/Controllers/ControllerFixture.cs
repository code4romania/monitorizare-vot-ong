using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using MonitorizareVot.Domain.Ong.Models;
using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MonitorizareVot.Domain.Ong;

namespace MonitorizareVot.Ong.Api.Tests.Controllers
{
    /// <summary>
    /// A test fixture which hosts the target project (project we wish to test) in an in-memory server.
    /// </summary>
    /// <typeparam name="TStartup">Target project's startup type</typeparam>
    public class ControllerFixture<TStartup> : IDisposable
    {
        public string ConnectionStringName { get; set; } = "DefaultConnection";

        private readonly TestServer _testServer;
        private readonly DatabaseFixture<VoteMonitorContext> _databaseFixture;

        public DbContextOptions<VoteMonitorContext> ContextOptions { get; set; }
        public HttpClient Client { get; private set; }

        public ControllerFixture(string environment)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;
            var builder = new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseEnvironment(environment)
                .UseStartup(typeof(TStartup));

            _testServer = new TestServer(builder);
            Client = _testServer.CreateClient();
            Client.BaseAddress = new Uri("http://localhost");

            var conf = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile($"appsettings.{environment}.json", optional: true, reloadOnChange: true)
            .Build();

            ContextOptions = new DbContextOptionsBuilder<VoteMonitorContext>()
                .UseSqlServer(conf.GetConnectionString(ConnectionStringName))
                .Options;

            _databaseFixture = new DatabaseFixture<VoteMonitorContext>(new VoteMonitorContext(ContextOptions));

            SeedData();
        }

        public virtual void SeedData()
        {
            using (var c = new VoteMonitorContext(ContextOptions))
            {
                c.Database.EnsureCreated();
                c.EnsureSeedData();
            }
        }

        public void Dispose()
        {
            Client.Dispose();
            _testServer.Dispose();
            _databaseFixture.Dispose();
        }
    }
}
