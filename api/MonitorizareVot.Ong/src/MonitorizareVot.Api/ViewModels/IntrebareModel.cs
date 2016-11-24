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
}
