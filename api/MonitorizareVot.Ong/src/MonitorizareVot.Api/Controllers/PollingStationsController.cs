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
using MonitorizareVot.Ong.Api.ViewModels;
using MonitorizareVot.Api.Exceptions;

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

        [Authorize]
        [HttpPost("import")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> ImportFormatFile(IFormFile file)
        {
            if(!_fileLoader.ValidateFile(file))
                return UnprocessableEntity();

            var result = await _mediator.Send(new PollingStationCommand(_fileLoader.ImportFileAsync(file).Result));

            if(result == -1)
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);

            return Ok();
        }
        
        [Authorize]
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetSinglePollingStation(int id)
        {
            if(id < 0)
                return new BadRequestResult();

            try
            {
                var pollingStationsView = await _mediator.Send(new PollingStationQuery(id));
                return Ok(pollingStationsView);
            } catch(ResourceNotFoundException ex)
            {
                _logger.LogError("Unable to find resource with id " + id);
                return NotFound();
            }
        }

        [Authorize]
        [HttpPost("")]
        [Consumes("application/json")]
        public async Task<IActionResult> PostSinglePollingStation([FromBody] PollingStationView PollingStationDTO)
        {
            if(!ModelState.IsValid)
                return UnprocessableEntity();

            try
            {
                var pollingStationId = await _mediator.Send(new PollingStationViewCommand(PollingStationDTO));
                return Created("", pollingStationId);
            } catch(ResourceNotFoundException ex)
            {
                _logger.LogError("Unable to save new polling station resource");
                return NotFound();
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateSinglePollingStation(int id, [FromBody] PollingStationView pollingStationView)
        {
            if(!ModelState.IsValid || pollingStationView.Id != id)
                return UnprocessableEntity();

            try
            {
                var pollingStation = await _mediator.Send(new PollingStationUpdateQuery(pollingStationView));
                return Ok(pollingStation.Id);
            } catch(ResourceNotFoundException ex)
            {
                _logger.LogError("Unable to modify the polling station with id " + id);
                return NotFound();
            }
        }
        
        [Authorize]
        [HttpGet("")]
        public async Task<IActionResult> GetAllPollingStations(int pageNumber, int pageSize)
        {
            if(pageNumber <= 0 || pageSize <= 0)
                return BadRequest();
            
            var pollingStationList = await _mediator.Send(new PollingStationPaginatedQuery(pageNumber, pageSize));

            return Ok(pollingStationList);
        }
    }
}