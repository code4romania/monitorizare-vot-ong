using MediatR;
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
        IAsyncRequestHandler<NotaQuery, List<NotaModel>>
    {

        private readonly OngContext _context;
        private readonly IMapper _mapper;

        public NoteQueryHandler(OngContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<NotaModel>> Handle(NotaQuery message)
        {
            return await _context.Nota
                .Where(n => n.IdObservator == message.IdObservator && n.IdSectieDeVotare == message.IdSectieDeVotare)
                .OrderBy(n => n.DataUltimeiModificari)
                .Select(n => new NotaModel
                {
                    IdNota = n.IdNota,
                    CaleFisierAtasat = n.CaleFisierAtasat,
                    TextNota = n.TextNota,
                    CodFormular = n.IdIntrebareNavigation.CodFormular,
                    CodIntrebare = n.IdIntrebareNavigation.IdIntrebare
                })
                .ToListAsync();
        }
    }
}
