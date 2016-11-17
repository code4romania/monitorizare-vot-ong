using MonitorizareVot.Ong.Api.Common;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class PagingModel
    {
        private int _page;
        private int _pageSize;

        public int Page
        {
            get { return _page; }
            set { _page = value < 1 ? 1 : value; }
        }

        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value < 1 ? Constants.DEFAULT_PAGE_SIZE : value; }
        }
    }

    public class PagingResponseModel : PagingModel
    {
        public int Total { get; set; }
    }
}
