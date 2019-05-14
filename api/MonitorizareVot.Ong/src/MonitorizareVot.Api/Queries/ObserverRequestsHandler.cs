using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Services;

namespace MonitorizareVot.Api.Queries
{
    public class ObserverRequestsHandler :
        IRequestHandler<ImportObserversRequest, int>, 
        IRequestHandler<NewObserverRequest, int>,
        IRequestHandler<ResetDeviceIdRequest>
    {
        private readonly VoteMonitorContext _context;
        private readonly ILogger _logger;
        private  IHashService _hashService;

        public ObserverRequestsHandler(VoteMonitorContext context, ILogger logger, IHashService hashService)
        {
            _context = context;
            _logger = logger;
            _hashService = hashService;
        }

        private int GetMaxIdObserver()
        {
            return _context.Observers.Max(o => o.Id) + 1;
        }

        public Task<int> Handle(ImportObserversRequest message, CancellationToken token)
        {
            var pathToFile = message.FilePath;
            var counter = 0;
            var startId = GetMaxIdObserver();

            using (var reader = File.OpenText(pathToFile))
            {
                while (reader.Peek() >= 0)
                {
                    var fileContent = reader.ReadLine();

                    var data = fileContent.Split('\t');
                    var hashed = _hashService.GetHash(data[1]);

                    var observer = new Observer
                    {
                        Id = startId + counter,
                        IdNgo = message.IdOng,
                        Phone = data[0],
                        Name = data[message.NameIndexInFile],
                        Pin = hashed
                    };
                    _context.Observers.Add(observer);
                    counter++;
                }
                _context.SaveChanges();
            }

            return Task.FromResult(counter);
        }


        public Task<int> Handle(NewObserverRequest message, CancellationToken token)
        {
            var id = GetMaxIdObserver();
            var observer = new Observer
            {
                Id = id,
                IdNgo = message.IdOng,
                Phone = message.NumarTelefon,
                Name = message.Nume,
                Pin = _hashService.GetHash(message.PIN)
            };
            _context.Observers.Add(observer);
            return _context.SaveChangesAsync();
        }


        public Task Handle(ResetDeviceIdRequest message, CancellationToken token)
        {
            // find observer
            var observers = _context.Observers.Where(o => o.Phone == message.PhoneNumber);
            if (observers.Count() != 1)
            {
                return Task.FromResult(0);
            }

            // make sure the number is unique
            // clear device id
            observers.First().MobileDeviceId = null;

            return _context.SaveChangesAsync();
            // save
        }
    }
}
