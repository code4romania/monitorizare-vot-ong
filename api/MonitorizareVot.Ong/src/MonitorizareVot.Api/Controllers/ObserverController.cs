using System.Threading.Tasks;
using System.Linq;
using System;
using System.Net;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.ObserverAggregate;
using MonitorizareVot.Ong.Api.Extensions;


namespace MonitorizareVot.Api.Controllers
{
    [Route("api/v1/observer")]
    public class ObserverController : Controller
    {
        private readonly IMediator _mediator;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public ObserverController(IMediator mediator, ILogger logger, IMapper mapper)
        {
            _mediator = mediator;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("import")]
        public void Import(IFormFile file, [FromForm] object a)
        { }

        [Authorize]
        [HttpPost]
        [Route("")]
        public async Task<dynamic> NewObserver(ObserverModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _mediator.Send(_mapper.Map<NewObserverRequest>(model));

            return Task.FromResult(new { });
        }

        [Authorize]
        [HttpPost]
        [Route("reset")]
        public async Task<IAsyncResult> Reset([FromForm] string action, [FromForm] string phoneNumber)
        {
            if(String.IsNullOrEmpty(action) || String.IsNullOrEmpty(phoneNumber))
                return Task.FromResult(BadRequest());

            if (String.Equals(action, ControllerExtensions.DEVICE_RESET))
            {
                var result = await _mediator.Send(new ResetDeviceCommand(ControllerExtensions.GetIdOngOrDefault(this, 0), phoneNumber));
                if (result == -1)
                    return Task.FromResult(NotFound(ControllerExtensions.RESET_ERROR_MESSAGE + phoneNumber));
                else
                    return Task.FromResult(Ok(result));
            }

            if(String.Equals(action, ControllerExtensions.PASSWORD_RESET))
            {
                var result = await _mediator.Send(new ResetPasswordCommand(ControllerExtensions.GetIdOngOrDefault(this, 0), phoneNumber));
                if (String.IsNullOrEmpty(result))
                    return Task.FromResult(NotFound(ControllerExtensions.RESET_ERROR_MESSAGE + phoneNumber));
                else
                    return Task.FromResult(Ok(result));
            }

            return Task.FromResult(UnprocessableEntity());
        }

        [Authorize]
        [HttpPost]
        [Route("generate")]
        public async Task<IAsyncResult> GenerateObservers([FromForm] int count)
        {
            if (!ControllerExtensions.ValidateGenerateObserversNumber(count))
                return Task.FromResult(new BadRequestObjectResult("Incorrect parameter supplied, please check that paramter is between boundaries: "
                    + ControllerExtensions.LOWER_OBS_VALUE + " - " + ControllerExtensions.UPPER_OBS_VALUE));
           
            ObserverGenerateCommand command = new ObserverGenerateCommand(count, 
                ControllerExtensions.GetIdOngOrDefault(this, 0));

            var result = _mediator.Send(command);

            return Task.FromResult(new OkObjectResult(result.Result));
        }
    }
}
