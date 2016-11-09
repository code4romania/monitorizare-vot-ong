using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class RaspunsuriQueryHandler :
        IAsyncRequestHandler<RaspunsuriQuery, ApiListResponse<RaspunsModel>>
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
            var sectiiCuObservatori = _context.Raspuns
                .Where(x => x.IdObservatorNavigation.IdOng == message.IdONG && x.IdRaspunsDisponibilNavigation.RaspunsCuFlag == message.Urgent)
                .Select(y => new SectieModel {
                    IdObservator = y.IdObservator,
                    Observator = y.IdObservatorNavigation.NumeIntreg,
                    IdSectie = y.IdSectieDeVotare,
                    NumarSectie = y.IdSectieDeVotareNavigation.NumarSectie,
                    CodJudet = y.IdSectieDeVotareNavigation.IdJudetNavigation.CodJudet,
                    Sectie = y.IdSectieDeVotareNavigation.DenumireUat,
                    DataUltimeiModificari = y.DataUltimeiModificari
                })
                .Distinct();

            var sectiiCuObservatoriPaginat = await sectiiCuObservatori
                 .OrderByDescending(x => x.DataUltimeiModificari)
                 .Skip((message.Page - 1) * message.PageSize)
                 .Take(message.PageSize)
                 .ToListAsync();

            return new ApiListResponse<RaspunsModel>
            {
                Data = sectiiCuObservatoriPaginat.Select(x => _mapper.Map<RaspunsModel>(x)).ToList(),
                Page = message.Page,
                PageSize = message.PageSize,
                Total = await sectiiCuObservatori.CountAsync()
            };
        }
    }
}
