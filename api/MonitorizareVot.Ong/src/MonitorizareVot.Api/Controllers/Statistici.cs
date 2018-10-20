using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Microsoft.Extensions.Configuration;
using MonitorizareVot.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/statistici")]
    public class Statistici : Controller
    {
        private readonly IConfigurationRoot _configuration;
        private readonly IMediator _mediator;
        private int _cacheHours;
        private int _cacheMinutes;
        private int _cacheSeconds;

        public Statistici(IMediator mediator, IConfigurationRoot configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
            _cacheHours = _configuration.GetValue<int>("DefaultCacheHours");
            _cacheMinutes = _configuration.GetValue<int>("DefaultCacheMinutes");
            _cacheSeconds = _configuration.GetValue<int>("DefaultCacheSeconds");
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
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            return await _mediator.Send(new StatisticiNumarObservatoriQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                PageSize = model.PageSize,
                Page = model.Page,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul judetelor sau sectiilor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">  Detaliile de paginare (default Page=1, PageSize=20)
        /// Grupare (0 - County | 1 - Sectie)
        /// Formular (codul formularulu care va fi luat in calcul pentru statistci - "" (string.Empty) inseamna toate)
        /// </param>
        /// <returns></returns>
        [HttpGet]
        [Route("Sesizari")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> Sesizari(FiltruStatisticiSimple model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            if (model.Grupare == TipGrupareStatistici.Sectie) model.PageSize = Common.Constants.DEFAULT_PAGE_SIZE;

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = model.Grupare,
                Formular = model.Formular,
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul judetelor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariJudete(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Judet,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariSectii(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));
            model.PageSize = Common.Constants.DEFAULT_PAGE_SIZE;

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = null,
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>   
        /// Returneaza topul judetelor in functie de numarul de sesizari la deschiderea sectiilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariDeschidereJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariDeschidereJudete(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Judet,
                Formular = "A",
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari la deschiderea sectiilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariDeschidereSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariDeschidereSectii(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));
            model.PageSize = Common.Constants.DEFAULT_PAGE_SIZE;

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = "A",
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul judetelor in functie de numarul de sesizari la numararea voturilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariNumarareJudete")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariNumarareJudete(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Judet,
                Formular = "C",
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza topul Sectiilor in functie de numarul de sesizari la numararea voturilor
        /// </summary>
        /// <param name="model">Detaliile de paginare (default Page=1, PageSize=20)</param>
        /// <returns></returns>
        [HttpGet]
        [Route("SesizariNumarareSectii")]
        public async Task<ApiListResponse<SimpleStatisticsModel>> SesizariNumarareSectii(PagingModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));
            model.PageSize = Common.Constants.DEFAULT_PAGE_SIZE;

            return await _mediator.Send(new StatisticiTopSesizariQuery
            {
                IdONG = idONG,
                Organizator = organizator,
                Grupare = TipGrupareStatistici.Sectie,
                Formular = "C",
                Page = model.Page,
                PageSize = model.PageSize,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        /// <summary>
        /// Returneaza numarul raspunsurilor date de observatorii unui anumit ONG
        /// grupate pe optiuni pentru o anumita intrebare
        /// </summary>
        /// <param name="model">Id - id-ul intrebarei pentru care sa se returneze statisticile</param>
        /// <returns></returns>
        [HttpGet]
        [Route("RaspunsuriNumarareOptiuni")]
        public async Task<OptiuniModel> RaspunsuriNumarareOptiuni(OptiuniFiltruModel model)
        {
            var idONG = this.GetIdOngOrDefault(_configuration.GetValue<int>("DefaultIdOng"));
            var organizator = this.GetOrganizatorOrDefault(_configuration.GetValue<bool>("DefaultOrganizator"));

            return await _mediator.Send(new StatisticiOptiuniQuery
            {
                IdIntrebare = model.IdIntrebare,
                Organizator = organizator,
                IdONG = idONG,
                CacheHours = _cacheHours,
                CacheMinutes = _cacheMinutes,
                CacheSeconds = _cacheSeconds
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("mini/answers")]
        public async Task<SimpleStatisticsModel> Answers()
        {
            return await _mediator.Send(new AnswersRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/stations")]
        public async Task<SimpleStatisticsModel> StationsVisited()
        {
            return await _mediator.Send(new StationsVisitedRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/counties")]
        public async Task<SimpleStatisticsModel> Counties()
        {
            return await _mediator.Send(new CountiesVisitedRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/notes")]
        public async Task<SimpleStatisticsModel> Notes()
        {
            return await _mediator.Send(new NotesUploadedRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/loggedinobservers")]
        public async Task<SimpleStatisticsModel> LoggedInObservers()
        {
            return await _mediator.Send(new LoggedInObserversRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/flaggedanswers")]
        public async Task<SimpleStatisticsModel> FlaggedAnswers()
        {
            return await _mediator.Send(new FlaggedAnswersRequest());
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("mini/all")]
        public async Task<List<SimpleStatisticsModel>> All()
        {
            var list = new List<SimpleStatisticsModel>
            {
                await _mediator.Send(new AnswersRequest()),
                await _mediator.Send(new StationsVisitedRequest()),
                await _mediator.Send(new CountiesVisitedRequest()),
                await _mediator.Send(new NotesUploadedRequest()),
                await _mediator.Send(new LoggedInObserversRequest()),
                await _mediator.Send(new FlaggedAnswersRequest())
            };

            return list;
        }

    }
}
