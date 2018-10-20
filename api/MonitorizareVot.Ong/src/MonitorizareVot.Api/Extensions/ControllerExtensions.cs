using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace MonitorizareVot.Ong.Api.Extensions
{
    public static class ControllerExtensions
    {
        public static int GetIdOngOrDefault(this Controller controller, int defaultIdOng)
        {
            int result;
            return int.TryParse(controller.User.Claims.FirstOrDefault(a => a.Type == "IdNgo")?.Value, out result) 
                ? result 
                : defaultIdOng;
        }

        public static bool GetOrganizatorOrDefault(this Controller controller, bool defaultOrganizator)
        {
            bool result;
            return bool.TryParse(controller.User.Claims.FirstOrDefault(a => a.Type == "Organizer")?.Value, out result)
                ? result
                : defaultOrganizator;
        }
    }
}
