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
        IRequestHandler<IntrebariQuery, VersiuneFormularCompletModel>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;

        public FormulareQueryHandler(VoteMonitorContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<VersiuneFormularCompletModel> Handle(IntrebariQuery message, CancellationToken cancellationToken)
        {
            return _context.FormVersions
                .Where(formVersion => formVersion.Code == message.CodFormular)
                .Include(formVersion => formVersion.FormSections)
                    .ThenInclude(formSection => formSection.Questions)
                    .ThenInclude(question => question.OptionsToQuestions)
                    .ThenInclude(oQuestion => oQuestion.Question)
                .Select(formVersion => _mapper.Map<VersiuneFormularCompletModel>(formVersion)).First();
        }
    }
}
