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
using static MonitorizareVot.Ong.Api.ViewModels.FormVersionModel;

namespace MonitorizareVot.Api.Queries
{
    public class FormVersionsQueryHandler : IRequestHandler<FormVersionsQuery, List<FormVersionModel>>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;

        public FormVersionsQueryHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<FormVersionModel>> Handle(FormVersionsQuery request, CancellationToken cancellationToken)
        {
            return _context.FormVersions.Select(r => new FormVersionModel { FormCode = r.Code, FormStatus = r.Status.ToString(), Version = r.CurrentVersion, Description = r.Description }).ToList();
        }
    }
}
