using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using MonitorizareVot.Ong.Api.Controllers;
using MonitorizareVot.Ong.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using AutoMapper;
using static MonitorizareVot.Ong.Api.ViewModels.VersiuneFormularModel;

namespace MonitorizareVot.Api.Queries
{
    public class VersiuniFormulareQueryHandler : IRequestHandler<VersiuniQuery, List<VersiuneFormularModel>>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;

        public VersiuniFormulareQueryHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<VersiuneFormularModel>> Handle(VersiuniQuery request, CancellationToken cancellationToken)
        {
            return _context.FormVersions.Select(r => new VersiuneFormularModel { CodFormular = r.Code, StatusFormular = r.Status.ToString(), Versiune = r.CurrentVersion, Descriere = r.Description }).ToList();
        }
    }
}
