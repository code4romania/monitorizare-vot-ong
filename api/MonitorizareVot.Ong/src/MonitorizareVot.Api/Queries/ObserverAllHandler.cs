using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Builders;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ObserverAllHandler : AsyncRequestHandler<ObserverAllCommand, List<Observer>>
    {
        public VoteMonitorContext _voteMonitorContext;
        public ILogger _logger;

        public ObserverAllHandler(VoteMonitorContext context, ILogger logger)
        {
            _voteMonitorContext = context;
            _logger = logger;
        }

        protected override Task<List<Observer>> HandleCore(ObserverAllCommand request)
        {
            try
            {
                List<Observer> observers = _voteMonitorContext.Observers.ToList(); 

                if (observers == null){
                    return Task.FromResult(new List<Observer>());
                }

                return Task.FromResult(observers);
            }
            catch (Exception exception)
            {
                _logger.LogError("Exception caught during resetting of Observer password for id " + request, exception);
            }

            return Task.FromResult(new List<Observer>());
        }
    }
}
