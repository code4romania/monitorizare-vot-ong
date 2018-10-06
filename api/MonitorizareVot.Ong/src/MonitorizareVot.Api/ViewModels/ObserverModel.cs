using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitorizareVot.Api.ViewModels
{
    public class ObserverModel
    {
        public int IdOng { get; set; }
        public string NumarTelefon { get; set; }
        public string PIN { get; set; }
        public string Nume { get; set; }
        public bool SendSMS { get; set; }
    }
}
