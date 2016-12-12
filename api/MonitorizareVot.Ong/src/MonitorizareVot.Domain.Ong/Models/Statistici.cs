
namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class StatisticiSimple
    {
        public string Label { get; set; }
        public int Value { get; set; }
    }

    public partial class StatisticiCompuse
    {
        public string Label { get; set; }
        public int Cod { get; set; }
        public int Value { get; set; }
    }

    public partial class StatisticiOptiuni 
    {
        public string Label { get; set; }
        public int Value { get; set; }
        public int Cod { get; set; }
        public bool RaspunsCuFlag { get; set; }
    }
}
