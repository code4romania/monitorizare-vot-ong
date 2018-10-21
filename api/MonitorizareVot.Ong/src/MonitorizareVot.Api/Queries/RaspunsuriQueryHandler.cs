using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class RaspunsuriQueryHandler :
        IRequestHandler<RaspunsuriQuery, ApiListResponse<RaspunsModel>>,
        IRequestHandler<RaspunsuriCompletateQuery, List<IntrebareModel<RaspunsCompletatModel>>>,
        IRequestHandler<RaspunsuriFormularQuery, RaspunsFormularModel>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;

        public RaspunsuriQueryHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiListResponse<RaspunsModel>> Handle(RaspunsuriQuery message, CancellationToken cancellationToken)
        {
            string queryUnPaged = $@"SELECT IdPollingStation AS IdSectie, R.IdObserver AS IdObserver, O.Name AS Observer, CONCAT(CountyCode, ' ', PollingStationNumber) AS Sectie, MAX(LastModified) AS LastModified
                FROM Answers R
                INNER JOIN Observers O ON O.Id = R.IdObserver
                INNER JOIN OptionsToQuestions RD ON RD.Id = R.IdOptionToQuestion
                WHERE RD.Flagged = {Convert.ToInt32(message.Urgent)}";

            if(!message.Organizator) queryUnPaged = $"{queryUnPaged} AND O.IdNgo = {message.IdONG}";

            queryUnPaged = $"{queryUnPaged} GROUP BY IdPollingStation, CountyCode, PollingStationNumber, R.IdObserver, O.Name, CountyCode";

            var queryPaged = $@"{queryUnPaged} ORDER BY LastModified DESC OFFSET {(message.Page - 1) * message.PageSize} ROWS FETCH NEXT {message.PageSize} ROWS ONLY";

            var sectiiCuObservatoriPaginat = await _context.RaspunsSectie
                .FromSql(queryPaged)
                .ToListAsync();

            var count = await _context.RaspunsSectie
                .FromSql(queryUnPaged)
                .CountAsync();

            return new ApiListResponse<RaspunsModel>
            {
                Data = sectiiCuObservatoriPaginat.Select(x => _mapper.Map<RaspunsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                TotalItems = count
            };
        }

        public async Task<List<IntrebareModel<RaspunsCompletatModel>>> Handle(RaspunsuriCompletateQuery message, CancellationToken cancellationToken)
        {
            var raspunsuri = await _context.Answers
                .Include(r => r.OptionAnswered)
                    .ThenInclude(rd => rd.Question)
                .Include(r => r.OptionAnswered)
                    .ThenInclude(rd => rd.Option)
                .Where(r => r.IdObserver == message.IdObservator && r.IdPollingStation == message.IdSectieDeVotare)
                .ToListAsync();

            var intrebari = raspunsuri
                .Select(r => r.OptionAnswered.Question)
                .ToList();

            return intrebari.Select(i => _mapper.Map<IntrebareModel<RaspunsCompletatModel>>(i)).ToList();
        }

        public async Task<RaspunsFormularModel> Handle(RaspunsuriFormularQuery message, CancellationToken cancellationToken)
        {
            var raspunsuriFormular = await _context.PollingStationInfos
                .FirstOrDefaultAsync(rd => rd.IdObserver == message.IdObservator && rd.IdPollingStation == message.IdSectieDeVotare);

            return _mapper.Map<RaspunsFormularModel>(raspunsuriFormular);
        }
    }
}
