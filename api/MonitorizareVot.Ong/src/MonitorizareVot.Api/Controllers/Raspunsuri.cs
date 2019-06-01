using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/raspunsuri")]
    public class Raspunsuri : Controller
    {
        private readonly IMediator _mediator;
        private readonly IConfigurationRoot _configuration;

        public Raspunsuri(IMediator mediator, IConfigurationRoot configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        /// <summary>
        /// Returneaza lista sectiilor de votare unde au raspuns observatorii care apartion ONG-ului cu id-ul primit
        /// la intrebarile din formulare marcate cu RaspunsFlag == Urgent ordonate desc dupa DataModificare
        /// </summary>
        /// <param name="model"> Detaliile de paginare (default Page=1, PageSize=20)
        /// Urgent (valoarea campului RaspunsFlag)
        /// </param>
        [HttpGet]
        public async Task<ApiListResponse<RaspunsModel>> Get(FiltruRaspunsuriSectiiModel model)
        {
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));
            var idOng = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));

            return await _mediator.Send(new RaspunsuriQuery
            {
                IdONG = idOng,
                Organizator = organizator,
                Page = model.Page,
                PageSize = model.PageSize,
                Urgent = model.Urgent,
                County = model.County,
                PollingStationNumber = model.PollingStationNumber,
                ObserverId = model.ObserverId
            });
        }

        /// <summary>
        /// Returneaza raspunsurile date de un observator pentru o anumita sectie de votare
        /// </summary>
        /// <param name="model">
        /// "IdSectieDeVotare" - Id-ul sectiei unde s-au completat raspunsurile
        /// "IdObservator" - Id-ul observatorului care a dat raspunsurile
        /// </param>
        [HttpGet("RaspunsuriCompletate")]
        public async Task<List<IntrebareModel<RaspunsCompletatModel>>> Get(FiltruRaspunsuriModel model)
        {
            return await _mediator.Send(new RaspunsuriCompletateQuery
            {
                IdObservator = model.IdObservator,
                IdSectieDeVotare = model.IdSectieDeVotare
            });
        }

        /// <summary>
        /// Returneaza raspunsurile formular date de un observator pentru o anumita sectie de votare
        /// </summary>
        /// <param name="model"> "IdSectieDeVotare" - Id-ul sectiei unde s-au completat raspunsurile
        /// "IdObservator" - Id-ul observatorului care a dat raspunsurile
        /// </param>
        [HttpGet("RaspunsuriFormular")]
        public async Task<RaspunsFormularModel> GetRaspunsuriFormular(FiltruRaspunsuriModel model)
        {
            return await _mediator.Send(new RaspunsuriFormularQuery
            {
                IdObservator = model.IdObservator,
                IdSectieDeVotare = model.IdSectieDeVotare
            });
        }
    }
}