using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class NoteQueryHandler :
        IAsyncRequestHandler<NotaQuery, ApiResponse<List<NotaModel>>>
    {

        private readonly OngContext _context;
        private readonly IMapper _mapper;

        public NoteQueryHandler(OngContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ApiResponse<List<NotaModel>>> Handle(NotaQuery message)
        {
            var note = await _context.Nota
                .Where(n => n.IdObservator == message.IdObservator && n.IdSectieDeVotare == message.IdSectieDeVotare)
                .OrderBy(n => n.IdIntrebareNavigation.CodFormular)
                .ThenBy(n => n.IdIntrebareNavigation.IdSectiuneNavigation.CodSectiune)
                .Select(n => new NotaDetaliiModel
                {
                    IdNota = n.IdNota,
                    CaleFisierAtasat = n.CaleFisierAtasat,
                    TextNota = n.TextNota,
                    CodFormular = n.IdIntrebareNavigation.CodFormular,
                    CodSectiune = n.IdIntrebareNavigation.IdSectiuneNavigation.CodSectiune
                })
                .ToListAsync();

            return new ApiResponse<List<NotaModel>> { Data = note.Select(x => _mapper.Map<NotaModel>(x)).ToList() };
        }
    }
}
