using MediatR;
using System;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsFormularModel
    {
        public DateTime DataUltimeiModificari { get; set; }
        public bool? EsteZonaUrbana { get; set; }
        public DateTime? OraPlecarii { get; set; }
        public DateTime? OraSosirii { get; set; }
        public bool? PresedinteBesvesteFemeie { get; set; }
    }

    public class RaspunsuriFormularQuery : IAsyncRequest<List<RaspunsFormularModel>>
    {
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
