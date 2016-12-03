using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class OptionStatisticsModel
    {
        [Required]
        public int IdIntrebare { get; set; }
    }

    public class StatisticiOptiuniQuery : IAsyncRequest<ApiResponse<List<SimpleStatisticsModel>>>
    {
        public int IdIntrebare { get; set; }
        public int IdONG { get; set; }
    }
}
