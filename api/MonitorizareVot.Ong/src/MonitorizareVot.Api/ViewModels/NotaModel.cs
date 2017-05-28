using MediatR;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class NotaModel
    {
        public int IdNota { get; set; }
        public string CaleFisierAtasat { get; set; }
        public string TextNota { get; set; }
        public string CodFormular { get; set; }
        public int? CodIntrebare { get; set; }
    }

    public class NotaQuery : IRequest<List<NotaModel>>
    {
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
