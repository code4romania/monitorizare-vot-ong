using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace MonitorizareVot.Api.ViewModels
{
    public class ResetDeviceIdRequest : IRequest
    {
        public string PhoneNumber { get; set; }
    }
}
