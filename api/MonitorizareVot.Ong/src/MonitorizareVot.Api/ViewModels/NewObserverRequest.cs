using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace MonitorizareVot.Api.ViewModels
{
    public class NewObserverRequest : IRequest<int>
    {
        public int IdOng { get; set; }
        public string NumarTelefon { get; set; }
        public string PIN { get; set; }
        public string Nume { get; set; }
        public bool SendSMS { get; set; }
    }
}
