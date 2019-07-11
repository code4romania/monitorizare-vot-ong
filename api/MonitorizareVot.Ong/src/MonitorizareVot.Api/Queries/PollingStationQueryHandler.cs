using System.Threading;
using MediatR;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;
using MonitorizareVot.Api.Exceptions;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class PollingStationQueryHandler : IRequestHandler<PollingStationQuery, PollingStationView>
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly VoteMonitorContext _context;

        public PollingStationQueryHandler(ILogger logger, IMapper mapper, VoteMonitorContext context)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<PollingStationView> Handle(PollingStationQuery request, CancellationToken cancellationToken)
        {
            var pollingStation = _context.PollingStations
                    .Where(p => p.Id == request.PollingStationId)
                    .FirstOrDefault();

            if(pollingStation == null)
                throw new ResourceNotFoundException();

            var pollingStationView = _mapper.Map<PollingStationView>(pollingStation);
            pollingStationView.CountyCode = _context.Counties
                    .Where(c => c.Id == pollingStation.IdCounty)
                    .FirstOrDefault()
                    .Code;
            return pollingStationView;
        }
    }
}