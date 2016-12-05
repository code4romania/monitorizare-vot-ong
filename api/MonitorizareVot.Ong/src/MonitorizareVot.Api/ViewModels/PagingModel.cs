using MonitorizareVot.Ong.Api.Common;
using System;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class PagingModel
    {
        protected int _page;
        protected int _pageSize;

        public int Page
        {
            get { return _page; }
            set { _page = value < 1 ? Constants.DEFAULT_PAGE : value; }
        }

        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value < 1 ? Constants.DEFAULT_PAGE_SIZE : value; }
        }
    }

    public class PagingResponseModel : PagingModel
    {
        protected int _totalItems;
        public int TotalItems 
        {
            get  { return _totalItems; } 
            set  { _totalItems = value; } 
        }
        public int TotalPages { 
            get { return _totalItems / _pageSize; }
        }
    }
}
