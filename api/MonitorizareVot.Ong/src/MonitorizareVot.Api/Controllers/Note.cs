using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/note")]
    public class Note : Controller
    {
        private readonly IMediator _mediator;

        public Note(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Returneaza notele atasate unui formular 
        /// </summary>
        /// <param name="SectionId">Id-ul sectiei unde s-a completat formularul</param>
        /// <param name="ObserverId">Id-ul observatorului care a completat formularul</param>
        /// <param name="model">{SectionId:int, ObserverId:int}</param>
        /// <returns></returns> 
        [HttpGet]
        public async Task<List<NotaModel>> Get(FiltruNoteModel model)
        {
            return await _mediator.Send(new NotaQuery
            {
                IdObservator = model.ObserverId,
                IdSectieDeVotare = model.SectionId
            });
        }
    }
}
