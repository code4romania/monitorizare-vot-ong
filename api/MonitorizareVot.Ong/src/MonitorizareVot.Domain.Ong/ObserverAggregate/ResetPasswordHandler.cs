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
    public class ResetPasswordHandler : AsyncRequestHandler<ResetPasswordCommand, string>
    {
        public VoteMonitorContext _voteMonitorContext;
        public ILogger _logger;

        public ResetPasswordHandler(VoteMonitorContext context, ILogger logger)
        {
            _voteMonitorContext = context;
            _logger = logger;
        }

        protected override Task<string> HandleCore(ResetPasswordCommand request)
        {
            try
            {
                Observer observer = _voteMonitorContext.Observers
                    .Where(o => o.Phone == request.PhoneNumber &&
                                o.IdNgo == request.IdNgo)
                    .First();

                if (observer == null)
                    return Task.FromResult(String.Empty);

                observer.Pin = RandomNumberGenerator.Generate(6);

                _voteMonitorContext.Update(observer);
                _voteMonitorContext.SaveChangesAsync();

                return Task.FromResult(observer.Pin);
            }
            catch (Exception exception)
            {
                _logger.LogError("Exception caught during resetting of Observer password for id " + request.PhoneNumber, exception);
            }

            return Task.FromResult(String.Empty);
        }
    }
}
