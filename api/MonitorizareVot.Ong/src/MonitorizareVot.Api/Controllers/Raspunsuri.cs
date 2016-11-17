using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using MonitorizareVot.Ong.Api.Filters;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/raspunsuri")]
    //[ValidateModelState]
    public class Raspunsuri : Controller
    {
        private readonly IMediator _mediator;

        public Raspunsuri(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Returneaza lista sectiilor de votare unde au raspuns observatorii care apartion ONG-ului cu id-ul primit
        /// la intrebarile din formulare marcate cu RaspunsFlag == Urgent ordonate desc dupa DataModificare
        /// </summary>
        /// <param name="model"> Detaliile de paginare (default Page=1, PageSize=5)
        /// Urgent (valoarea campului RaspunsFlag)
        /// </param>
        [HttpGet]
        public async Task<ApiListResponse<RaspunsModel>> Get(FiltruRaspunsuriModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;
            return await _mediator.SendAsync(new RaspunsuriQuery
            {
                IdONG = idONG,
                Page = model.Page,
                PageSize = model.PageSize,
                Urgent = model.Urgent
            });
        }
    }
}