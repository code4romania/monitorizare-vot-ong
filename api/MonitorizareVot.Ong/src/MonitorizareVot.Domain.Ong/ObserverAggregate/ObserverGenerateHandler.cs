using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Builders;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ObserverGenerateHandler : AsyncRequestHandler<ObserverGenerateCommand, List<GeneratedObserver>>
    {
        private readonly VoteMonitorContext _voteMonitorContext;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public ObserverGenerateHandler(VoteMonitorContext context, ILogger logger, IMapper mapper)
        {
            _voteMonitorContext = context;
            _logger = logger;
            _mapper = mapper;
        }

        protected async override Task<List<GeneratedObserver>> HandleCore(ObserverGenerateCommand command)
        {
            List<Observer> dbObservers = new List<Observer>();
            List<GeneratedObserver> generatedObservers = new List<GeneratedObserver>();


            for(int i = 0; i < command.NrObservers; ++i)
            {
                RandomObserverBuilder builder = new RandomObserverBuilder();
                dbObservers.Add(builder.build(command.IdNgo));
            }

            try
            {
                using(var tran = await _voteMonitorContext.Database.BeginTransactionAsync())
                {
                    int latestId = _voteMonitorContext.Observers
                        .OrderByDescending(o => o.Id)
                        .FirstOrDefault()
                        .Id;

                    dbObservers = dbObservers
                        .Select(o => { o.Id = ++latestId; return o; })
                        .ToList();

                    _voteMonitorContext.Observers.AddRange(dbObservers.ToArray());
                    var result = await _voteMonitorContext.SaveChangesAsync();
                    tran.Commit();

                    return dbObservers
                        .Select(o => _mapper.Map<GeneratedObserver>(o))
                        .ToList();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError("Error during generation of random observers", ex, ex.Message);
            }

            return await Task.FromResult(generatedObservers);
        }
    }
}
