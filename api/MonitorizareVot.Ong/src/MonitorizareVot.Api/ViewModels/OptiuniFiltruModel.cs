using MediatR;
using System.ComponentModel.DataAnnotations;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class OptiuniFiltruModel
    {
        [Required]
        public int IdIntrebare { get; set; }
    }

    public class StatisticiOptiuniQuery : StatisticiQuery, IAsyncRequest<OptiuniModel>
    {
        public int IdIntrebare { get; set; }
    }

    public class StatisticiQuery
    {
        public int IdONG { get; set; }
        public bool Organizator { get; set; }
        public int CacheHours { get; set; }
        public int CacheMinutes { get; set; }
        public int CacheSeconds { get; set; }
    }

    public class StatisticiPaginatedQuery : PagingModel
    {
        public int IdONG { get; set; }
        public bool Organizator { get; set; }
        public int CacheHours { get; set; }
        public int CacheMinutes { get; set; }
        public int CacheSeconds { get; set; }
    }
}
