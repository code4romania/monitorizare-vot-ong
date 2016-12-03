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
            //return await _context.Nota
            //    .Where(n => n.IdObservator == message.IdObservator && n.IdSectieDeVotare == message.IdSectieDeVotare)
            //    .OrderBy(n => n.DataUltimeiModificari)
            //    .Select(n => new NotaDetaliiModel
            //    {
            //        IdNota = n.IdNota,
            //        CaleFisierAtasat = n.CaleFisierAtasat,
            //        TextNota = n.TextNota,
            //        CodFormular = n.IdIntrebareNavigation.CodFormular,
            //        CodIntrebare = n.IdIntrebareNavigation.IdIntrebare
            //    })
            //    .ToListAsync();

            return new List<NotaModel>{
                new NotaModel {
                    IdNota = 1,
                    CaleFisierAtasat = "https://monitorizarevottest.blob.core.windows.net/note/ce334ac7af4a4c9ba6668dc04eb4d439",
                    TextNota = "Text nota",
                    CodFormular = "A",
                    CodIntrebare = 1
                },
                new NotaModel {
                    IdNota = 2,
                    CaleFisierAtasat = "https://monitorizarevottest.blob.core.windows.net/note/d9471a6cdc954066b37f0ebb09a849d8",
                    TextNota = "Text nota",
                    CodFormular = "A",
                    CodIntrebare = 2
                }
            };
        }
    }
}
