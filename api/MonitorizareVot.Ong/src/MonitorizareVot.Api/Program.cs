using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace MonitorizareVot.Ong.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var currentDir = Directory.GetCurrentDirectory();            
            currentDir = GetParent(currentDir, 4) + "\\frontend";
            // maybe rewrite this as an extension method ( couldn't do that :D )
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(currentDir)
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            
            host.Run();
        }
        private static string GetParent(string folder, int times = 1)
        {
            var dirInfo = new DirectoryInfo(folder);
            for (var i = 0; i < times; i++)
            {
                dirInfo = dirInfo.Parent;
            }
            return dirInfo.FullName;
        }
    }
}
