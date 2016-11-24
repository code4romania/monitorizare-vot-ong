using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsCompletatModel
    {
        public int IdOptiune { get; set; }
        public string TextOptiune { get; set; }
        public bool SeIntroduceText { get; set; }
        public bool RaspunsCuFlag { get; set; }

        public IList<RaspunsSelectatModel> Raspunsuri { get; set; }
    }
}
