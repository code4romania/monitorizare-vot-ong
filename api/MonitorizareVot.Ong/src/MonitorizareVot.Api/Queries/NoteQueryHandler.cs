using MediatR;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class NoteQueryHandler :
        IRequestHandler<NotaQuery, List<NotaModel>>
    {

        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;

        public NoteQueryHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<NotaModel>> Handle(NotaQuery message, CancellationToken token)
        {
            return await _context.Notes
                .Where(n => n.IdObserver == message.IdObservator && n.IdPollingStation == message.IdSectieDeVotare)
                .OrderBy(n => n.LastModified)
                .Select(n => new NotaModel
                {
                    IdNota = n.Id,
                    CaleFisierAtasat = n.AttachementPath,
                    TextNota = n.Text,
                    CodFormular = n.Question.FormCode,
                    CodIntrebare = n.Question.Id
                })
                .ToListAsync();
        }
    }
}
