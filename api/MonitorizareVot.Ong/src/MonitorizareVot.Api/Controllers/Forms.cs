using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/formulare")]
    public class Forms : Controller
    {
        private readonly IMediator _mediator;

        public Forms(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Se interogheaza ultima versiunea a formularului pentru observatori si se primeste definitia lui. 
        /// In definitia unui formular nu intra intrebarile standard (ora sosirii, etc). 
        /// Acestea se considera implicite pe fiecare formular.
        /// </summary>
        /// <param name="idFormular">Id-ul formularului pentru care trebuie preluata definitia</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<SectiuneModel>> Get(FiltruFormulareModel model)
        {
            return await _mediator.Send(new IntrebariQuery { CodFormular = model.IdFormular });
        }

        /// <summary>
        /// Get a list of forms
        /// </summary>
        /// <param name="request">Paging information</param>
        /// <returns></returns>
        [HttpGet("list")]
        public async Task<ApiListResponse<SectiuneModel>> GetForms(GetFormsRequest request) => await _mediator.Send(request);
    }
}
