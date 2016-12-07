using MediatR;
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
        public bool Organizator { get; set; }
    }
}
