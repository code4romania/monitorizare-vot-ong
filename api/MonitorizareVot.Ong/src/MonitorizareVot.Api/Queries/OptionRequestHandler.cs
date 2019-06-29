using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;

namespace MonitorizareVot.Api.Queries
{
    public class OptionRequestHandler : IRequestHandler<OptiuneModelRequest, int>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public OptionRequestHandler(VoteMonitorContext context, IMapper mapper, ILogger logger)
        {
            this._context = context;
            this._mapper = mapper;
            this._logger = logger;
        }

        private int GetMaxIdOption()
        {
            return _context.Options.Max(o => o.Id) + 1;
        }

        public Task<int> Handle(OptiuneModelRequest request, CancellationToken cancellationToken)
        {
            var option = _mapper.Map<Option>(request.OptiuneModel);
            var maxOptionId = GetMaxIdOption();
            option.Id = maxOptionId;

            _context.Options.Add(option);
            _context.SaveChangesAsync();

            return Task.FromResult(maxOptionId);
        }
    }
}