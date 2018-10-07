using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Api.ViewModels;

namespace MonitorizareVot.Api.Controllers
{
    [Route("api/v1/observer")]
    public class Observer : Controller
    {
        private readonly IMediator _mediator;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public Observer(IMediator mediator, ILogger logger, IMapper mapper)
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
            
            return Task.FromResult(new {});
        }
        [Authorize]
        [HttpPatch]
        [Route("")]
        public async Task<dynamic> ResetDeviceId(string phoneNumber)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //await _mediator.Send(new ResetDeviceIdRequest {PhoneNumber = phoneNumber});

            return await Task.FromResult(new { });
        }
    }
}
