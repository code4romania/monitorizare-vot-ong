using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class IntrebareModel
    {
        public int IdIntrebare { get; set; }
        public string TextIntrebare { get; set; }
        public int IdTipIntrebare { get; set; }

        public IList<RaspunsCompletatModel> RaspunsuriDisponibile { get; set; }
    }

    public class IntrebariQuery : IAsyncRequest<ApiResponse<List<SectiuneModel>>>
    {
        public string CodFormular { get; set; }
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
