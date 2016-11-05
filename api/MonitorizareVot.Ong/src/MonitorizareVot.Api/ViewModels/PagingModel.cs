using System.ComponentModel.DataAnnotations;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class PagingModel
    {
        [Range(1, int.MaxValue)]
        public int Page { get; set; }
        [Range(1, Common.Constants.MAX_TAKE)]
        public int PageSize { get; set; }
    }

    public class PagingResponseModel : PagingModel
    {
        public int Total { get; set; }
    }
}
