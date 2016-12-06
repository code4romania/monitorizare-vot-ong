using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Ong.Api.Services;
using System;
using System.Linq.Expressions;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class StatisticiQueryHandler :
        IAsyncRequestHandler<StatisticiNumarObservatoriQuery, ApiListResponse<SimpleStatisticsModel>>,
        IAsyncRequestHandler<StatisticiTopSesizariQuery, ApiListResponse<SimpleStatisticsModel>>,
        IAsyncRequestHandler<StatisticiOptiuniQuery, OptiuniModel>
    {
        private readonly OngContext _context;
        private readonly ICacheService _cacheService;
        private readonly IMapper _mapper;

        public StatisticiQueryHandler(OngContext context, IMapper mapper, ICacheService cacheService)
        {
            _context = context;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        public async Task<OptiuniModel> Handle(StatisticiOptiuniQuery message)
        {
            var statistici = await _context.RaspunsDisponibil
                .Where(rd => rd.IdIntrebare == message.IdIntrebare)
                .Select(rd => new
                {
                    Optiune = rd.IdOptiuneNavigation,
                    RaspunsCuFlag = rd.RaspunsCuFlag,
                    Count = rd.Raspuns.Count(r => r.IdObservatorNavigation.IdOng == message.IdONG)
                })
                .OrderByDescending(a => a.Count)
                .ToListAsync();

            return new OptiuniModel
            {
                IdIntrebare = message.IdIntrebare,
                Optiuni = statistici.Select(s => new OptiuniStatisticsModel
                {
                    IdOptiune = s.Optiune.IdOptiune,
                    Label = s.Optiune.TextOptiune,
                    Value = s.Count.ToString(),
                    RaspunsCuFlag = s.RaspunsCuFlag
                })
                    .ToList(),
                Total = statistici.Sum(s => s.Count)
            };
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiNumarObservatoriQuery message)
        {
            var unPagedList = _context.Judet
                .Select(
                    j => new
                    {
                        Judet = j,
                        Count = j.SectieDeVotare.SelectMany(s => s.Raspuns).Count(r => r.IdObservatorNavigation.IdOng == message.IdONG)
                    })
                .OrderByDescending(p => p.Count);

            var pagedList = await unPagedList // this query is executed in memory
                .Skip((message.Page - 1) * message.PageSize)
                .Take(message.PageSize)
                .ToListAsync();

            var map = pagedList.Select(p => new SimpleStatisticsModel { Label = p.Judet.Nume, Value = p.Count.ToString() });

            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = map.ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = await unPagedList.CountAsync()
            };
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiTopSesizariQuery message)
        {
            return message.Grupare == TipGrupareStatistici.Judet
                ? await GetSesizariJudete(message)
                : await GetSesizariSectii(message);
        }

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariJudete(StatisticiTopSesizariQuery message)
        {
            var unPagedList = _context.Judet
              .Select(
                  j => new JudetStatisticsModel
                  {
                      Nume = j.Nume,
                      // TODO: use a predicate instead of a ternary operator
                      Count = !string.IsNullOrEmpty(message.Formular) 
                              ? j.SectieDeVotare
                                 .SelectMany(s => s.Raspuns)
                                 .Count(r => r.IdObservatorNavigation.IdOng == message.IdONG
                                    && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true
                                    && r.IdRaspunsDisponibilNavigation.IdIntrebareNavigation.CodFormular == message.Formular)
                              :j.SectieDeVotare
                                .SelectMany(s => s.Raspuns)
                                .Count(r => r.IdObservatorNavigation.IdOng == message.IdONG
                                    && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true)
                  })
              .OrderByDescending(p => p.Count);

            var pagedList = await unPagedList // this query is executed in memory
                .Skip((message.Page - 1) * message.PageSize)
                .Take(message.PageSize)
                .ToListAsync();

            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = pagedList.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = await unPagedList.CountAsync()
            };
        }

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariSectii(StatisticiTopSesizariQuery message)
        {
            var unPagedList = _context.SectieDeVotare
             .Select(
                 s => new SectieStatisticsModel
                 {
                     NumarSectie = s.NumarSectie,
                     CodJudet = s.IdJudetNavigation.CodJudet,
                     // TODO: use a predicate instead of a ternary operator
                     Count = !string.IsNullOrEmpty(message.Formular)  
                             ? s.Raspuns.Count(r => r.IdObservatorNavigation.IdOng == message.IdONG
                                    && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true
                                    && r.IdRaspunsDisponibilNavigation.IdIntrebareNavigation.CodFormular == message.Formular)
                             : s.Raspuns.Count(r => r.IdObservatorNavigation.IdOng == message.IdONG
                                    && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true)
                 })
             .OrderByDescending(p => p.Count);

            var pagedList = await unPagedList // this query is executed in memory
                .Skip((message.Page - 1) * message.PageSize)
                .Take(message.PageSize)
                .ToListAsync();

            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = pagedList.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = await unPagedList.CountAsync()
            };
        }

        /// <summary>
        /// Predicate to filter Response by idOng, RaspunsCuFlag and CodFormular
        /// </summary>
        /// <param name="idOng"></param>
        /// <param name="formular">if formular is empty or null, the filter by CodFormular is ignored</param>
        private Func<Raspuns, bool> MakeFilterPredicate(int idOng, string formular)
        {
            if (!string.IsNullOrEmpty(formular))
                return r => r.IdObservatorNavigation.IdOng == idOng
                            && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true
                            && r.IdRaspunsDisponibilNavigation.IdIntrebareNavigation.CodFormular == formular;

            return r => r.IdObservatorNavigation.IdOng == idOng
                            && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true;
        }
    }
    
    public static class RaspunsFilters
    {
        public static int FilterAndCount(this IEnumerable<Raspuns> raspunsuri, int idOng, string formular)
        {
            if (!string.IsNullOrEmpty(formular))
                return raspunsuri.Count(r => r.IdObservatorNavigation.IdOng == idOng
                                && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true
                                && r.IdRaspunsDisponibilNavigation.IdIntrebareNavigation.CodFormular == formular);

            return raspunsuri.Count(r => r.IdObservatorNavigation.IdOng == idOng
                           && r.IdRaspunsDisponibilNavigation.RaspunsCuFlag == true);
        }
    }
}
