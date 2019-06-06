using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using static MonitorizareVot.Ong.Api.ViewModels.FormVersionCompleteModel;
using static MonitorizareVot.Ong.Api.ViewModels.FormVersionModel;

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
        /// Se interogheaza ultima versiunea a formularului pentru observatori si se primeste definitia lui. 
        /// In definitia unui formular nu intra intrebarile standard (ora sosirii, etc). 
        /// Acestea se considera implicite pe fiecare formular.
        /// </summary>
        /// <param name="model">
        /// "idFormular" Id-ul formularului pentru care trebuie preluata definitia
        /// </param>
        /// <returns></returns>
        [HttpGet]
        public async Task<FormVersionCompleteModel> Get(FiltruFormulareModel model)
        {
            return await _mediator.Send(new IntrebariQuery { CodFormular = model.IdFormular });
        }
        
        /// <summary>
        /// Returneaza toate versiunile formularelor
        /// </summary>
        /// <returns></returns>
        [HttpGet("versions")]
        public async Task<List<FormVersionModel>> Get()
        {
            return await _mediator.Send(new FormVersionsQuery());
        }

        [HttpGet("options")]
        public async Task<List<OptiuneModel>> GetOptiuni()
        {
            return await _mediator.Send(new OptionsQuery());
        }

        /// <summary>
        /// Metoda de creeare a unui formular. 
        /// </summary>
        /// <param name="toCreate"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<FormVersionCompleteModel> Post([FromBody] FormVersionCompleteModel toCreate)
        {
            return await _mediator.Send(new CreateOrUpdateFormRequest { ToCreateOrUpdate = toCreate, isCreatingNew = true });

        }
        /// <summary>
        /// Metoda de actualizare a unui formular
        /// </summary>
        /// <param name="toUpdate"></param>
        /// <returns></returns>

        [HttpPut]
        public async Task<FormVersionCompleteModel> Put([FromBody] FormVersionCompleteModel toUpdate)
        {
            return await _mediator.Send(new CreateOrUpdateFormRequest { ToCreateOrUpdate = toUpdate });
        }
    }
}
