using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Models;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Domain.Ong
{
    public class Program
    {

        public IConfigurationRoot Configuration { get; }

        public static void Main(string[] args)
        {
            var configuration  = Startup.RegisterConfiguration();
            ILoggerFactory loggerFactory = new LoggerFactory();
            var logger = loggerFactory.CreateLogger("Ef Migrations");
            loggerFactory.AddConsole(configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            IServiceCollection services = new ServiceCollection();

            services.AddSingleton(loggerFactory);
            var conn = configuration.GetConnectionString("DefaultConnection");


            services.AddDbContext<VoteMonitorContext>(options => options.UseSqlServer(conn));

            IServiceProvider provider = services.BuildServiceProvider();

            logger.LogDebug($"Initialized Context with {conn}");


            using (var serviceScope = provider.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<VoteMonitorContext>();
                logger.LogDebug($"Initializing Database...");
                context.Database.EnsureCreated();
                logger.LogDebug($"Migration finished");
                logger.LogDebug($"Initializing data seeding...");
                context.EnsureSeedData();
                logger.LogDebug($"Data seeded for {conn}");

            }
        }
    }
}
