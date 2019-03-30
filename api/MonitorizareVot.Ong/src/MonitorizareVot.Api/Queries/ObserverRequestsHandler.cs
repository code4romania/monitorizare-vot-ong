﻿using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.Services;

namespace MonitorizareVot.Api.Queries
{
    public class ObserverRequestsHandler :
        IAsyncRequestHandler<ImportObserversRequest, int>, 
        IAsyncRequestHandler<NewObserverRequest, int>,
        IAsyncRequestHandler<ResetDeviceIdRequest>,
        IAsyncRequestHandler<GetObserversRequest, ApiListResponse<ObserverModel>>
    {
        private readonly OngContext _context;
        private readonly ILogger _logger;
        private  IHashService _hashService;
        private readonly IMapper _mapper;

        public ObserverRequestsHandler(OngContext context, ILogger logger, IHashService hashService,
            IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _hashService = hashService;
            _mapper = mapper;
        }

        private int GetMaxIdObserver()
        {
            return _context.Observator.Max(o => o.IdObservator) + 1;
        }

        public Task<int> Handle(ImportObserversRequest message)
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

                    var observer = new Observator
                    {
                        IdObservator = startId + counter,
                        IdOng = message.IdOng,
                        NumarTelefon = data[0],
                        NumeIntreg = data[message.NameIndexInFile],
                        Pin = hashed
                    };
                    _context.Observator.Add(observer);
                    counter++;
                }
                _context.SaveChanges();
            }

            return Task.FromResult(counter);
        }


        public Task<int> Handle(NewObserverRequest message)
        {
            var id = GetMaxIdObserver();
            var observer = new Observator
            {
                IdObservator = id,
                IdOng = message.IdOng,
                NumarTelefon = message.NumarTelefon,
                NumeIntreg = message.Nume,
                Pin = _hashService.GetHash(message.PIN)
            };
            _context.Observator.Add(observer);
            return _context.SaveChangesAsync();
        }


        public Task Handle(ResetDeviceIdRequest message)
        {
            // find observer
            var observers = _context.Observator.Where(o => o.NumarTelefon == message.PhoneNumber);
            if (observers.Count() != 1)
            {
                return Task.FromResult(0);
            }

            // make sure the number is unique
            // clear device id
            observers.First().IdDispozitivMobil = null;

            return _context.SaveChangesAsync();
            // save
        }

        /// <summary>
        /// Retrieves a paged list of observers
        /// </summary>
        /// <param name="request">The request containing paging information</param>
        /// <returns>A paged list of observers</returns>
        public async Task<ApiListResponse<ObserverModel>> Handle(GetObserversRequest request)
        {
            var observers = _context.Observator;
            var pagedObservers = await observers
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync()
                .ConfigureAwait(false);
            var observersCount = await observers
                .CountAsync()
                .ConfigureAwait(false);

            return new ApiListResponse<ObserverModel>
            {
                Data = pagedObservers
                    .Select(o => _mapper.Map<ObserverModel>(o))
                    .ToList(),
                Page = request.Page,
                PageSize = request.PageSize,
                TotalItems = observersCount
            };
        }
    }
}
