using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using MonitorizareVot.Api.Exceptions;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class PollingStationUpdateHandler : IRequestHandler<PollingStationUpdateQuery, PollingStation>
    {
        private readonly VoteMonitorContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public PollingStationUpdateHandler(VoteMonitorContext context, ILogger logger, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
            this._logger = logger;
        }
        public Task<PollingStation> Handle(PollingStationUpdateQuery request, CancellationToken cancellationToken)
        {
            var pollingStation = _context.PollingStations
                    .Where(p => p.Id == request.PollingStationView.Id)
                    .FirstOrDefault();

            if(pollingStation == null)
                throw new ResourceNotFoundException();
            
            var updatedPollingStation = _mapper.Map<PollingStation>(request.PollingStationView);
            County pollingStationCounty = _context.Counties
                            .Where(c => c.Code == request.PollingStationView.CountyCode)
                            .FirstOrDefault();

            if(pollingStationCounty == null)
                throw new ResourceNotFoundException();

            pollingStation.IdCounty = pollingStationCounty.Id;
            pollingStation.Number = updatedPollingStation.Number;
            pollingStation.Address = updatedPollingStation.Address;
            pollingStation.AdministrativeTerritoryCode = updatedPollingStation.AdministrativeTerritoryCode;

            _context.SaveChangesAsync();

            return Task.FromResult(updatedPollingStation);
        }
    }
}