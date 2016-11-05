using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class StatisticiQueryHandler :
        IAsyncRequestHandler<StatisticiNumarObservatoriQuery, ApiListResponse<SimpleStatisticsModel>>,
        IAsyncRequestHandler<StatisticiTopSesizariQuery, ApiListResponse<SimpleStatisticsModel>>
    {
        private readonly OngContext _context;
        private readonly IMapper _mapper;

        public StatisticiQueryHandler(OngContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiListResponse<SimpleStatisticsModel>> Handle(StatisticiNumarObservatoriQuery message)
        {
            var unPagedList = _context.Judet.Select(
                    j => new {Judet = j, Count = j.SectieDeVotare.SelectMany(s => s.Raspuns).Count()})
                .OrderByDescending(p => p.Count);
            
            var pagedList = await unPagedList
                .Skip((message.Page - 1) * message.PageSize)
                .Take(message.PageSize)
                .ToListAsync();

            var map = pagedList.Select(p => new SimpleStatisticsModel { Label = p.Judet.Nume, Value = p.Count.ToString() });

            return new ApiListResponse<SimpleStatisticsModel>
            {
                Data = map.ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                Total = await unPagedList.CountAsync()
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
                Total = 2
            };
        }
    }
}
