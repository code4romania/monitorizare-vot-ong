using MediatR;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class IntrebareModel<T> 
        where T : class
    {
        public int IdIntrebare { get; set; }
        public string TextIntrebare { get; set; }
        public int IdTipIntrebare { get; set; }
        public string CodIntrebare { get; set; }
        public string CodFormular { get; set; }

        public IList<T> Raspunsuri { get; set; }
    }

    public class RaspunsuriCompletateQuery : IRequest<List<IntrebareModel<RaspunsCompletatModel>>>
    {
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
