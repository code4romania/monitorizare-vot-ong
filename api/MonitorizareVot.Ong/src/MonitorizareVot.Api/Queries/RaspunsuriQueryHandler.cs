using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class RaspunsuriQueryHandler :
        IAsyncRequestHandler<RaspunsuriQuery, ApiListResponse<RaspunsModel>>,
        IAsyncRequestHandler<RaspunsuriCompletateQuery, List<IntrebareModel<RaspunsCompletatModel>>>,
        IAsyncRequestHandler<RaspunsuriFormularQuery, RaspunsFormularModel>
    {
        private readonly OngContext _context;
        private readonly IMapper _mapper;

        public RaspunsuriQueryHandler(OngContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiListResponse<RaspunsModel>> Handle(RaspunsuriQuery message)
        {
            string queryUnPaged = $@"SELECT IdSectieDeVotare AS IdSectie, R.IdObservator AS IdObservator, O.NumeIntreg AS Observator, CONCAT(CodJudet, ' ', NumarSectie) AS Sectie, MAX(DataUltimeiModificari) AS DataUltimeiModificari
                FROM Raspuns R
                INNER JOIN OBSERVATOR O ON O.IdObservator = R.IdObservator
                INNER JOIN RaspunsDisponibil RD ON RD.IdRaspunsDisponibil = R.IdRaspunsDisponibil
                WHERE RD.RaspunsCuFlag = {Convert.ToInt32(message.Urgent)}";

            if(!message.Organizator) queryUnPaged = $"{queryUnPaged} AND O.IdOng = {message.IdONG}";

            queryUnPaged = $"{queryUnPaged} GROUP BY IdSectieDeVotare, CodJudet, NumarSectie, R.IdObservator, O.NumeIntreg, CodJudet";

            var queryPaged = $@"{queryUnPaged} ORDER BY DataUltimeiModificari DESC OFFSET {(message.Page - 1) * message.PageSize} ROWS FETCH NEXT {message.PageSize} ROWS ONLY";

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

        public async Task<List<IntrebareModel<RaspunsCompletatModel>>> Handle(RaspunsuriCompletateQuery message)
        {
            var raspunsuri = await _context.Raspuns
                .Include(r => r.IdRaspunsDisponibilNavigation)
                    .ThenInclude(rd => rd.IdIntrebareNavigation)
                .Include(r => r.IdRaspunsDisponibilNavigation)
                    .ThenInclude(rd => rd.IdOptiuneNavigation)
                .Where(r => r.IdObservator == message.IdObservator && r.IdSectieDeVotare == message.IdSectieDeVotare)
                .ToListAsync();

            var intrebari = raspunsuri
                .Select(r => r.IdRaspunsDisponibilNavigation.IdIntrebareNavigation)
                .ToList();

            return intrebari.Select(i => _mapper.Map<IntrebareModel<RaspunsCompletatModel>>(i)).ToList();
        }

        public async Task<RaspunsFormularModel> Handle(RaspunsuriFormularQuery message)
        {
            var raspunsuriFormular = await _context.RaspunsFormular
                .FirstOrDefaultAsync(rd => rd.IdObservator == message.IdObservator && rd.IdSectieDeVotare == message.IdSectieDeVotare);

            return _mapper.Map<RaspunsFormularModel>(raspunsuriFormular);
        }
    }
}
