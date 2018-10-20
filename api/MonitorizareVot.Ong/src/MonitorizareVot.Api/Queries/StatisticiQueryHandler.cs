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
using System.Threading;
using Microsoft.Extensions.Caching.Distributed;
using MonitorizareVot.Ong.Api.Common;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class StatisticiQueryHandler :
        IRequestHandler<StatisticiNumarObservatoriQuery, ApiListResponse<SimpleStatisticsModel>>,
        IRequestHandler<StatisticiTopSesizariQuery, ApiListResponse<SimpleStatisticsModel>>,
        IRequestHandler<StatisticiOptiuniQuery, OptiuniModel>
    {
        private readonly VoteMonitorContext _context;
        private readonly ICacheService _cacheService;
        private readonly IMapper _mapper;

        public StatisticiQueryHandler(VoteMonitorContext context, IMapper mapper, ICacheService cacheService)
        {
            _context = context;
            _mapper = mapper;
            _cacheService = cacheService;
        }

        public async Task<OptiuniModel> Handle(StatisticiOptiuniQuery message, CancellationToken token)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = $@"SELECT OB.Text AS Label, OB.Id AS Cod, RD.Flagged, COUNT(*) as Value
                  FROM Answer AS R 
                  INNER JOIN OptionsToQuestions AS RD ON RD.IdOptionToQuestion = R.IdOptionToQuestion
                  INNER JOIN Option AS OB ON OB.Id = RD.Id
                  INNER JOIN Observer O ON O.IdObserver = R.IdObserver
                  WHERE RD.Id = {message.IdIntrebare}",
                CacheKey = $"StatisticiOptiuni-{message.IdIntrebare}"
            };

            queryBuilder.AndOngFilter(message.Organizator, message.IdONG);
            queryBuilder.Append("GROUP BY OB.Text, OB.Id, RD.Flagged");

            return await _cacheService.GetOrSaveDataInCacheAsync(queryBuilder.CacheKey,
                async () =>
                {
                    var records = await _context.StatisticiOptiuni
                        .FromSql(queryBuilder.Query)
                        .ToListAsync();

                    return new OptiuniModel
                    {
                        IdIntrebare = message.IdIntrebare,
                        Optiuni = records.Select(s => new OptiuniStatisticsModel
                        {
                            IdOptiune = s.Cod,
                            Label = s.Label,
                            Value = s.Value.ToString(),
                            RaspunsCuFlag = s.RaspunsCuFlag
                        })
                        .ToList(),
                        Total = records.Sum(s => s.Value)
                    };
                },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = new TimeSpan(message.CacheHours, message.CacheMinutes, message.CacheMinutes)
                }
            );
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiNumarObservatoriQuery message, CancellationToken token)
        {
            //var queryBuilder = new StatisticiQueryBuilder
            //{
            //    Query = @"SELECT J.Name AS Label, COUNT(*) as Value
            //      FROM County J
            //      INNER JOIN PollingStations AS SV ON SV.Id = J.Id
            //      INNER JOIN [Answer] AS R ON R.IdPollingStation = SV.Id
            //      INNER JOIN Observer O ON O.IdObserver = R.IdObserver",
            //    CacheKey = "StatisticiObservatori"
            //};

            var queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"select count(distinct a.IdObserver) as [Value], CountyCode as Label
                          from Answers a (nolock) inner join Observers o on a.IdObserver = o.Id ",
                CacheKey = "StatisticiObservatori"
            };
            
            queryBuilder.WhereOngFilter(message.Organizator, message.IdONG);
            //queryBuilder.Append("GROUP BY J.Name ORDER BY Value DESC");            
            queryBuilder.Append("group by CountyCode order by [Value] desc");

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
                    AbsoluteExpirationRelativeToNow = new TimeSpan(message.CacheHours, message.CacheMinutes, message.CacheMinutes)
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

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiTopSesizariQuery message, CancellationToken token)
        {
            return message.Grupare == TipGrupareStatistici.Judet
                ? await GetSesizariJudete(message, token)
                : await GetSesizariSectii(message, token);
        }

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariJudete(StatisticiTopSesizariQuery message, CancellationToken token)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"SELECT R.CountyCode AS Label, COUNT(*) as Value
                  FROM Answer AS R 
                  INNER JOIN OptionsToQuestions AS RD ON RD.IdOptionToQuestion = R.IdOptionToQuestion
                  INNER JOIN Observer O ON O.IdObserver = R.IdObserver
                  INNER JOIN Question I ON I.Id = RD.Id
                  WHERE RD.Flagged = 1",
                CacheKey = "StatisticiJudete"
            };

            queryBuilder.AndOngFilter(message.Organizator, message.IdONG);
            queryBuilder.AndFormularFilter(message.Formular);
            queryBuilder.Append("GROUP BY R.CountyCode ORDER BY Value DESC");

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
                    AbsoluteExpirationRelativeToNow = new TimeSpan(message.CacheHours, message.CacheMinutes, message.CacheMinutes)
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

        private async Task<ApiListResponse<SimpleStatisticsModel>> GetSesizariSectii(StatisticiTopSesizariQuery message, CancellationToken token)
        {
            StatisticiQueryBuilder queryBuilder = new StatisticiQueryBuilder
            {
                Query = @"SELECT R.CountyCode AS Label, R.PollingStationNumber AS Cod, COUNT(*) as Value
                  FROM Answer AS R 
                  INNER JOIN OptionsToQuestions AS RD ON RD.IdOptionToQuestion = R.IdOptionToQuestion
                  INNER JOIN Observer O ON O.IdObserver = R.IdObserver
                  INNER JOIN Question I ON I.Id = RD.Id
                  WHERE RD.Flagged = 1",
                CacheKey = "StatisticiSectii"
            };

            queryBuilder.AndOngFilter(message.Organizator, message.IdONG);
            queryBuilder.AndFormularFilter(message.Formular);
            queryBuilder.Append("GROUP BY R.CountyCode, R.PollingStationNumber");

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
                    AbsoluteExpirationRelativeToNow = new TimeSpan(message.CacheHours, message.CacheMinutes, message.CacheMinutes)
                }
            );
        }
    }
}
