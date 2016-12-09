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
using Microsoft.Extensions.Caching.Distributed;
using MonitorizareVot.Ong.Api.Common;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class StatisticiQueryHandler :
        IAsyncRequestHandler<StatisticiNumarObservatoriQuery, ApiListResponse<SimpleStatisticsModel>>,
        IAsyncRequestHandler<StatisticiNumarObservatoriRawQuery, ApiListResponse<SimpleStatisticsModel>>,
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
            var statistici = await _context.Raspuns
                .Where(r => r.IdRaspunsDisponibilNavigation.IdIntrebare == message.IdIntrebare)
                .Where(r => message.Organizator || r.IdObservatorNavigation.IdOng == message.IdONG)
                .GroupBy(r => new { r.IdRaspunsDisponibilNavigation.IdOptiuneNavigation, r.IdRaspunsDisponibilNavigation.RaspunsCuFlag })
                .Select(g => new
                {
                    Optiune = g.Key.IdOptiuneNavigation,
                    RaspunsCuFlag = g.Key.RaspunsCuFlag,
                    Count = g.Count()
                })
                .OrderBy(a => a.Count)
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

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiNumarObservatoriRawQuery message)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"SELECT J.Nume AS Label, COUNT(*) as Value
                  FROM Judet J
                  INNER JOIN SectieDeVotare AS SV ON SV.IdJudet = J.IdJudet
                  INNER JOIN [Raspuns] AS R ON R.IdSectieDeVotare = SV.IdSectieDeVotarre
                  INNER JOIN Observator O ON O.IdObservator = R.IdObservator",
                CacheKey = "StatisticiObservatori"
            };

            queryBuilder.WhereOngFilter(message.Organizator, message.IdONG);
            queryBuilder.Append("GROUP BY J.Nume ORDER BY Value DESC");

            // get or save all records in cache
            var records = await _cacheService.GetOrSaveDataInCacheAsync(queryBuilder.CacheKey,
                async () =>
                {
                    return await _context.StatisticiSimple
                    .FromSql(queryBuilder.Query)
                    .ToListAsync();
                },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = new TimeSpan(Constants.DEFAULT_CACHE_HOURS, Constants.DEFAULT_CACHE_MINUTES, Constants.DEFAULT_CACHE_SECONDS)
                }
            );
            
            // perform count and pagination on the records retrieved from the cache 
            var pagedList = records.Paginate(message.Page, message.PageSize);
           
            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = pagedList.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = records.Count()
            };
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiNumarObservatoriQuery message)
        {
            return await _cacheService.GetOrSaveDataInCacheAsync($"StatisticiObservatori-{message.IdONG}-{message.Organizator}-{message.Page}",
             async () =>
             {
                 var unPagedList = _context.Raspuns
                   .Where(r => message.Organizator || r.IdObservatorNavigation.IdOng == message.IdONG)
                   .GroupBy(r => r.IdSectieDeVotareNavigation.IdJudetNavigation)
                   .Select(g => new
                   {
                       Nume = g.Key,
                       Count = g.Count()
                   })
                   .OrderByDescending(g => g.Count);

                 var pagedList = await unPagedList // this query is executed in memory
                     .Skip((message.Page - 1) * message.PageSize)
                     .Take(message.PageSize)
                     .ToListAsync();

                 var map = pagedList.Select(p => new SimpleStatisticsModel { Label = p.Nume.Nume, Value = p.Count.ToString() });

                 return new ApiListResponse<SimpleStatisticsModel>
                 {
                     Data = map.ToList(),
                     Page = message.Page,
                     PageSize = message.PageSize,
                     TotalItems = await unPagedList.CountAsync() // this query triggers a select in the db, count is executed in memory 
                 };
             },
             new DistributedCacheEntryOptions
             {
                 AbsoluteExpirationRelativeToNow = new TimeSpan(Constants.DEFAULT_CACHE_HOURS, Constants.DEFAULT_CACHE_MINUTES, Constants.DEFAULT_CACHE_SECONDS)
             });
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiTopSesizariQuery message)
        {
            return message.Grupare == TipGrupareStatistici.Judet
                ? await GetSesizariJudete(message)
                : await GetSesizariSectii(message);
        }

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariJudete(StatisticiTopSesizariQuery message)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"SELECT R.CodJudet AS Label, COUNT(*) as Value
                  FROM Raspuns AS R 
                  INNER JOIN RaspunsDisponibil AS RD ON RD.IdRaspunsDisponibil = R.IdRaspunsDisponibil
                  INNER JOIN Observator O ON O.IdObservator = R.IdObservator
                  INNER JOIN Intrebare I ON I.IdIntrebare = RD.IdIntrebare
                  WHERE RD.RaspunsCuFlag = 1",
                CacheKey = "StatisticiJudete"
            };

            queryBuilder.AndOngFilter(message.Organizator, message.IdONG);
            queryBuilder.AndFormularFilter(message.Formular);
            queryBuilder.Append("GROUP BY R.CodJudet ORDER BY Value DESC");

            // get or save all records in cache
            var records = await _cacheService.GetOrSaveDataInCacheAsync(queryBuilder.CacheKey,
                async () =>
                {
                    return await _context.StatisticiSimple
                    .FromSql(queryBuilder.Query)
                    .ToListAsync();
                },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = new TimeSpan(Constants.DEFAULT_CACHE_HOURS, Constants.DEFAULT_CACHE_MINUTES, Constants.DEFAULT_CACHE_SECONDS)
                }
            );

            // perform count and pagination on the records retrieved from the cache 
            var pagedList = records.Paginate(message.Page, message.PageSize);

            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = pagedList.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = records.Count()
            };
        }

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariSectii(StatisticiTopSesizariQuery message)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"SELECT R.CodJudet AS Label, R.NumarSectie AS Cod, COUNT(*) as Value
                  FROM Raspuns AS R 
                  INNER JOIN RaspunsDisponibil AS RD ON RD.IdRaspunsDisponibil = R.IdRaspunsDisponibil
                  INNER JOIN Observator O ON O.IdObservator = R.IdObservator
                  INNER JOIN Intrebare I ON I.IdIntrebare = RD.IdIntrebare
                  WHERE RD.RaspunsCuFlag = 1",
                CacheKey = "StatisticiSectii"
            };

            queryBuilder.AndOngFilter(message.Organizator, message.IdONG);
            queryBuilder.AndFormularFilter(message.Formular);
            queryBuilder.Append("GROUP BY R.CodJudet, R.NumarSectie");

            // get or save paginated response in cache
            return await _cacheService.GetOrSaveDataInCacheAsync($"{queryBuilder.CacheKey}-{message.Page}",
                async () =>
                {
                    var records = await _context.StatisticiCompuse
                        .FromSql(queryBuilder.GetPaginatedQuery(message.Page, message.PageSize))
                        .ToListAsync();

                    return new ApiListResponse<SimpleStatisticsModel>
                    {
                        Data = records.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
                        Page = message.Page,
                        PageSize = message.PageSize,
                        TotalItems = await _context.StatisticiCompuse.FromSql(queryBuilder.Query).CountAsync()
                    };
                },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = new TimeSpan(Constants.DEFAULT_CACHE_HOURS, Constants.DEFAULT_CACHE_MINUTES, Constants.DEFAULT_CACHE_SECONDS)
                }
            );


            //var unPagedList = _context.Raspuns
            //    .Where(a => a.IdRaspunsDisponibilNavigation.RaspunsCuFlag)
            //    .Where(a => message.Organizator || a.IdObservatorNavigation.IdOng == message.IdONG)
            //    .Where(a => string.IsNullOrEmpty(message.Formular) || a.IdRaspunsDisponibilNavigation.IdIntrebareNavigation.CodFormular == message.Formular)
            //    .GroupBy(a => new { a.NumarSectie, a.CodJudet })
            // .Select(r => new SectieStatisticsModel
            //    {
            //        CodJudet = r.Key.CodJudet,
            //        NumarSectie = r.Key.NumarSectie,
            //        Count = r.Count()
            //    });

            //var pagedList = await unPagedList //TODO this query is executed in memory
            //    .OrderByDescending(a => a.Count)
            //    .Skip((message.Page - 1) * message.PageSize)
            //    .Take(message.PageSize)
            //    .ToListAsync();

            //return new ApiListResponse<SimpleStatisticsModel>
            //{
            //    Data = pagedList.Select(x => _mapper.Map<SimpleStatisticsModel>(x)).ToList(),
            //    Page = message.Page,
            //    PageSize = message.PageSize,
            //    TotalItems = await unPagedList.CountAsync()
            //};
        }
    }
}
