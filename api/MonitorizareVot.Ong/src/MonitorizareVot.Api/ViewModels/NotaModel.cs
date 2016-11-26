using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class NotaModel
    {
        public int IdNota { get; set; }
        public string CaleFisierAtasat { get; set; }
        public string TextNota { get; set; }
        public string CodFormular { get; set; }
        public string CodSectiune { get; set; }
    }

    public class NotaQuery : IAsyncRequest<ApiResponse<List<NotaModel>>>
    {
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
