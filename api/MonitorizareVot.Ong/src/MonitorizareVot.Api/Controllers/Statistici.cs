using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/statistici")]
    public class Statistici : Controller
    {
        private readonly IMediator _mediator;

        public Statistici(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Returneaza topul judetelor in functie de numarul de observatori
        /// </summary>
        /// <param name="model">Detaliile de paginare</param>
        /// <returns></returns>
        [HttpGet]
        [Route("NumarObservatori")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> NumarObservatori(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;
            
            return await _mediator.SendAsync(new StatisticiNumarObservatoriQuery
            {
                IdONG = idONG,
                PageSize = model.PageSize,
                Page = model.Page
            });
        }

        /// <summary>
        /// Returneaza topul judetelor sau sectiilor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">  Detaliile de paginare (default Page=1, PageSize=5)
        /// Grupare (0 - Judet | 1 - Sectie)
        /// Formular (codul formularulu care va fi luat in calcul pentru statistci - "" (string.Empty) inseamna toate)
        /// </param>
        /// <returns></returns>
        [HttpGet]
        [Route("Sesizari")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> Sesizari(FiltruStatisticiSimple model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = model.Grupare,
                Formular = model.Formular,
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza topul judetelor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariJudete(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Judet,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariSectii([FromForm] PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>   
        /// Returneaza topul judetelor in functie de numarul de sesizari la deschiderea sectiilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariDeschidereJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariDeschidereJudete(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Judet,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari la deschiderea sectiilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariDeschidereSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariDeschidereSectii(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza topul judetelor in functie de numarul de sesizari la numararea voturilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariNumarareJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariNumarareJudete(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariJudeteQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Judet,
                Formular = "C",
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari la numararea voturilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=5)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariNumarareSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariNumarareSectii(PagingModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = "C",
                Page = model.Page,
                PageSize = model.PageSize
            });
        }

        /// <summary>
        /// Returneaza numarul raspunsurilor date de observatorii unui anumit ONG
        /// grupate pe optiuni pentru o anumita intrebare
        /// </summary>
        /// <param name="model">IdIntrebare - id-ul intrebarei pentru care sa se returneze statisticile</param>
        /// <returns></returns>
        [HttpGet]
        [Route("RaspunsuriNumarareOptiuni")]
        public async Task<OptiuniModel> RaspunsuriNumarareOptiuni(OptiuniFiltruModel model)
        {
            // TODO get the idONG from token
            var idONG = 1;

            return await _mediator.SendAsync(new StatisticiOptiuniQuery
            {
                IdIntrebare = model.IdIntrebare,
                IdONG = idONG
            });
        }
    }
}
