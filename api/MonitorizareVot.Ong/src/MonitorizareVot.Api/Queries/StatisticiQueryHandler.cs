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
                .Select(rd => new {
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
                .Skip((message.Page - 1) * message.PageSize)
                .Take(message.PageSize)
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

        /// <summary>
        /// Mocked for now. 
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiTopSesizariQuery message)
        {
            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = new List<SimpleStatisticsModel>
                {
                    new SimpleStatisticsModel
                    {
                        Label = "TestJudet",
                        Value = "123"
                    },
                    new SimpleStatisticsModel
                    {
                        Label = "TestJudet2",
                        Value = "568"
                    }
                },
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = 2
            };
        }
    }
}
