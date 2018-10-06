using MediatR;

namespace MonitorizareVot.Api.ViewModels
{
    public class ImportObserversRequest : IRequest<int>
    {
        public int IdOng { get; set; }
        public string FilePath { get; set; }
        public int NameIndexInFile { get; set; }
    }
}
