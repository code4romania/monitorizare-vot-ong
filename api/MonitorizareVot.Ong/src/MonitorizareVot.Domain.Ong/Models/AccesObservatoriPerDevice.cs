using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class AccesObservatoriPerDevice
    {
        public int IdObservator { get; set; }
        public string IdDispozitivMobil { get; set; }
        public DateTime DataInregistrariiDispozitivului { get; set; }

        public virtual Observator IdObservatorNavigation { get; set; }
    }
}
