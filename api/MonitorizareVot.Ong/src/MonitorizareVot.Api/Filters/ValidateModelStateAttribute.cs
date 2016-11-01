using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MonitorizareVot.Ong.Api.Filters
{
    /// <summary>
    /// A filter which checks if the model state is valid 
    /// and returns Bad Request if it is not valid along with the model state attached
    /// </summary>
    public class ValidateModelStateAttribute : ActionFilterAttribute
    {
        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(context.ModelState);
            }

            return base.OnActionExecutionAsync(context, next);
        }
    }
}
