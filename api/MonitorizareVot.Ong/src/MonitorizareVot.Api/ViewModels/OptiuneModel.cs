using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonitorizareVot.Api.ViewModels
{
    public class OptiuneModel
    {
        public int Id { get; set; }
        public bool SeIntroduceText { get; set; }
        public string Text { get; set; }
        public string Hint { get; set; }
    }

    public class OptiuniQuery : IRequest<List<OptiuneModel>>
    {

    } 
}
