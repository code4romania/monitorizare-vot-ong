using MediatR;
using MonitorizareVot.Ong.Api.Extensions;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsModel
    {
        public string Sectie { get; set; }

        public string Observator { get; set; }

        public int IdSectie { get; set; }

        public int IdObservator { get; set; }
    }

    public class RaspunsuriQuery : PagingModel, IAsyncRequest<ApiListResponse<RaspunsModel>>
    {
        public int IdONG { get; set; }
        public bool Urgent { get; set; }
        public bool Organizator { get; set; }
    }
}