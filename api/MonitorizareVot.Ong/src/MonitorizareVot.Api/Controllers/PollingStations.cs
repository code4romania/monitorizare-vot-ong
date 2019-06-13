using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System;
using System.IO;
using MonitorizareVot.Ong.Api.Services;
using System.Collections.Generic;
using MonitorizareVot.Domain.Ong.ValueObjects;
using MonitorizareVot.Domain.Ong.PollingStationAggregate;

namespace MonitorizareVot.Api.Controllers
{
    [Route("/api/v1/pollingStations")]
    public class PollingStationsController : Controller
    {
        private readonly IMediator _mediator;
        private readonly ILogger _logger;
        private readonly IFileLoader _fileLoader;

        public PollingStationsController(IMediator mediator, ILogger logger, IFileLoader loader)
        {
            this._mediator = mediator;
            this._logger = logger;
            this._fileLoader = loader;
        }

        [HttpPost]
        [Authorize]
        [Route("")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> importFormatFile(IFormFile file)
        {
            if(!_fileLoader.validateFile(file))
                return new BadRequestResult();

            var result = await _mediator.Send(new PollingStationCommand(_fileLoader.importFileAsync(file).Result));

            if(result == -1)
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);

            return new OkResult();
        }
    }
}