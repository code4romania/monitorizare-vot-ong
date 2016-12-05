using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class OptiuniModel
    {
        public int IdIntrebare { get; set; }
        public IList<OptiuniStatisticsModel> Optiuni { get; set; }
        public int Total { get; set; }
    }

    public class OptiuniStatisticsModel : SimpleStatisticsModel
    {
        public int IdOptiune { get; set; }
        public bool RaspunsCuFlag { get; set; }
    }
}
