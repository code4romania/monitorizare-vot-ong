using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/formulare")]
    public class Formulare : Controller
    {
        private readonly IMediator _mediator;

        public Formulare(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Returneaza formularul cu raspunsurile completate 
        /// </summary>
        /// <param name="idFormular">Id-ul formularului pentru care trebuie preluata definitia</param>
        /// <param name="IdSectieDeVotare">Id-ul sectiei unde s-a completat formularul</param>
        /// <param name="idObservator">Id-ul observatorului care a completat formularul</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResponse<List<SectiuneModel>>> Get(FiltruFormulareModel model)
        {
            return await _mediator.SendAsync(new IntrebariQuery
            {
                CodFormular = model.IdFormular,
                IdObservator = model.IdObservator,
                IdSectieDeVotare = model.IdSectieDeVotare
            });
        }
    }
}
