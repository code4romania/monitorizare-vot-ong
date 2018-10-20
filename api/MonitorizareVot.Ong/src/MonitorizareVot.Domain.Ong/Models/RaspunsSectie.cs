using System;

namespace MonitorizareVot.Domain.Ong.Models
{
    public class RaspunsSectie
    {
        public string Sectie { get; set; }

        public string Observator { get; set; }

        public int IdSectie { get; set; }

        public int IdObservator { get; set; }

        public DateTime DataUltimeiModificari { get; set; }
    }
}
