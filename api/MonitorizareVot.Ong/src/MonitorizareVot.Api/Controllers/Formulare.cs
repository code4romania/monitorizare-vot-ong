using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using static MonitorizareVot.Ong.Api.ViewModels.VersiuneFormularCompletModel;
using static MonitorizareVot.Ong.Api.ViewModels.VersiuneFormularModel;

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
        public async Task<VersiuneFormularCompletModel> Get(FiltruFormulareModel model)
        {
            return await _mediator.Send(new IntrebariQuery { CodFormular = model.IdFormular });
        }
        
        /// <summary>
        /// Returneaza toate versiunile formularelor
        /// </summary>
        /// <returns></returns>
        [HttpGet("versiuni")]
        public async Task<List<VersiuneFormularModel>> Get()
        {
            return await _mediator.Send(new VersiuniQuery());
        }

        [HttpGet("optiuni")]
        public async Task<List<OptiuneModel>> GetOptiuni()
        {
            return await _mediator.Send(new OptiuniQuery());
        }

        /// <summary>
        /// Metoda de creeare a unui formular. 
        /// </summary>
        /// <param name="toCreate"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<VersiuneFormularCompletModel> Post([FromBody] VersiuneFormularCompletModel toCreate)
        {
            return await _mediator.Send(new CreateOrUpdateFormular { ToCreateOrUpdate = toCreate, isCreatingNew = true });

        }
        /// <summary>
        /// Metoda de actualizare a unui formular
        /// </summary>
        /// <param name="toUpdate"></param>
        /// <returns></returns>

        [HttpPut]
        public async Task<VersiuneFormularCompletModel> Put([FromBody] VersiuneFormularCompletModel toUpdate)
        {
            return await _mediator.Send(new CreateOrUpdateFormular { ToCreateOrUpdate = toUpdate });
        }
    }
}
