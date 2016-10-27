using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class DispozitivObservator
    {
        public int IdDispozitivObservator { get; set; }
        public int IdObservator { get; set; }
        public string IdentificatorUnic { get; set; }

        public virtual Observator IdObservatorNavigation { get; set; }
    }
}
