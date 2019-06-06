using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using static MonitorizareVot.Ong.Api.ViewModels.FormVersionCompleteModel;
using MonitorizareVot.Ong.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using AutoMapper;

namespace MonitorizareVot.Api.DAOs
{
    public class CreateOrUpdateFormRequestHandler : IRequestHandler<CreateOrUpdateFormRequest, FormVersionCompleteModel>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;
        public CreateOrUpdateFormRequestHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public Task<FormVersionCompleteModel> Handle(CreateOrUpdateFormRequest request, CancellationToken cancellationToken)
        {
            FormVersion formVersion = _mapper.Map<FormVersion>(request.ToCreateOrUpdate);

            if(request.isCreatingNew)
            {
                _context.FormVersions.Add(formVersion);
            } else
            {
                _context.Set<FormVersion>().Attach(formVersion);
            }
            _context.SaveChanges();
            return null;
        }
    }
}
