using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using MonitorizareVot.Api.Exceptions;
using System;

namespace MonitorizareVot.Api.Queries
{
    public class PollingStationCreateHandler : IRequestHandler<PollingStationViewCommand, int>
    {
        private readonly VoteMonitorContext _context;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public PollingStationCreateHandler(VoteMonitorContext context, ILogger logger, IMapper mapper)
        {
            this._context = context;
            this._logger = logger;
            this._mapper = mapper;
        }
        public Task<int> Handle(PollingStationViewCommand request, CancellationToken cancellationToken)
        {
            Random random = new Random();

            var pollingStation = _mapper.Map<PollingStation>(request.PollingStationView);
            var maxId = _context.PollingStations.Max(p => p.Id);
            County pollingStationCounty = _context.Counties
                            .Where(c => c.Code == request.PollingStationView.CountyCode)
                            .FirstOrDefault(null);

            if(pollingStationCounty == null)
                throw new ResourceNotFoundException();

            pollingStation.Id = maxId++;
            pollingStation.County = pollingStationCounty;
            pollingStation.IdCounty = pollingStationCounty.Id;
            pollingStation.TerritoryCode = random.Next(10000).ToString();

            _context.Add(pollingStation);
            _context.SaveChangesAsync();

            return Task.FromResult(pollingStation.Id);
        }
    }
}