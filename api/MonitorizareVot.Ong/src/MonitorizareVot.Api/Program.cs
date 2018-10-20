using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace MonitorizareVot.Ong.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {         
            var host = new WebHostBuilder()
                .UseApplicationInsights()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            
            host.Run();
        }
    }
}
