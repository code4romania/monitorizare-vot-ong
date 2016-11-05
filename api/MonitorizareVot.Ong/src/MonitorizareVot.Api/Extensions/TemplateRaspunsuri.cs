using System.Collections.Generic;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Extensions
{
    public class ApiResponse<T> 
        where T: class 
    {
        public T Data { get; set; }
    }
    
    public class ListaRaspunsuri<T> : PagingResponseModel
    {
        public List<T> Raspunsuri { get; set; }
    }
}
