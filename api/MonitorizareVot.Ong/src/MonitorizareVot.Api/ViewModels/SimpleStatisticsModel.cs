using MediatR;
using MonitorizareVot.Ong.Api.Extensions;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SimpleStatisticsModel
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }

    public class StatisticiNumarObservatoriQuery : PagingModel, IAsyncRequest<ApiListResponse<SimpleStatisticsModel>>
    {
        public int IdONG { get; set; }
        public bool Organizator { get; set; }
    }

    public enum TipGrupareStatistici
    {
        Judet,
        Sectie
    }

    public class StatisticiTopSesizariQuery : PagingModel, IAsyncRequest<ApiListResponse<SimpleStatisticsModel>>
    {
        public int IdONG { get; set; }
        public bool Organizator { get; set; }
        public string Formular { get; set; }
        public TipGrupareStatistici Grupare { get; set; }
    }
}
