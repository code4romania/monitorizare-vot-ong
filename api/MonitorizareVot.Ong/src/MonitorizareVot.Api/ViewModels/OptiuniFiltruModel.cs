using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class OptiuniFiltruModel
    {
        [Required]
        public int IdIntrebare { get; set; }
    }

    public class StatisticiOptiuniQuery : IAsyncRequest<OptiuniModel>
    {
        public int IdIntrebare { get; set; }
        public int IdONG { get; set; }
    }
}
