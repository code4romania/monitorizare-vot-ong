using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace MonitorizareVot.Ong.Api.Extensions
{
    public static class ControllerExtensions
    {
        public static int GetIdOngOrDefault(this Controller controller, int defaultIdOng)
        {
            int result;
            return int.TryParse(controller.User.Claims.FirstOrDefault(a => a.Type == "IdOng")?.Value, out result) 
                ? result 
                : defaultIdOng;
        }
    }
}
