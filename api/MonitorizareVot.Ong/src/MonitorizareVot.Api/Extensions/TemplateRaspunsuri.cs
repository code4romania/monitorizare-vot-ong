using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.Extensions
{
    public class Raspuns<T>
        where T: class 
    {
        public T Data { get; set; }
    }

    public class ListaRaspunsuri<T>
    {
        public int PageSize { get; set; }
        public int Total { get; set; }
        public int Page { get; set; }
        public List<T> Raspunsuri { get; set; }
    }
}
