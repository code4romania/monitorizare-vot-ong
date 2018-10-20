using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class FormulareQueryHandler :
        IRequestHandler<IntrebariQuery, List<SectiuneModel>>
    {
        private readonly OngContext _context;
        private readonly IMapper _mapper;

        public FormulareQueryHandler(OngContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<SectiuneModel>> Handle(IntrebariQuery message, CancellationToken cancellationToken)
        {
            var intrebari = await _context.Intrebare
                .Include(i => i.FormSection)
                .Include(i => i.OptionsToQuestions)
                    .ThenInclude(i => i.IdOptiuneNavigation)
                .Where(i => i.FormCode == message.CodFormular)
                .ToListAsync();

            var sectiuni = intrebari.Select(a => new { IdSectiune = a.IdSection, a.FormSection.CodSectiune, a.FormSection.Descriere }).Distinct();

            return sectiuni.Select(i => new SectiuneModel
            {
                CodSectiune = i.CodSectiune,
                Descriere = i.Descriere,
                Intrebari = intrebari.Where(a => a.IdSection == i.IdSectiune)
                                     .OrderBy(intrebare=>intrebare.Code)
                                     .Select(a => _mapper.Map<IntrebareModel<RaspunsDisponibilModel>>(a)).ToList()
            }).ToList();
        }
    }
}
