using MediatR;
using MonitorizareVot.Ong.Api.Extensions;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SimpleStatisticsModel
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }

    public class StatisticiNumarObservatoriQuery : StatisticiPaginatedQuery, IAsyncRequest<ApiListResponse<SimpleStatisticsModel>>
    {
    }

    public enum TipGrupareStatistici
    {
        Judet,
        Sectie
    }

    public class StatisticiTopSesizariQuery : StatisticiPaginatedQuery, IAsyncRequest<ApiListResponse<SimpleStatisticsModel>>
    {
        public string Formular { get; set; }
        public TipGrupareStatistici Grupare { get; set; }
    }
}
