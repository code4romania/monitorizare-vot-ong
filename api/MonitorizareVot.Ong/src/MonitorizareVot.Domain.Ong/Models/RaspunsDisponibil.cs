using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class RaspunsDisponibil
    {
        public RaspunsDisponibil()
        {
            Raspuns = new HashSet<Raspuns>();
        }

        public int IdRaspunsDisponibil { get; set; }
        public int IdIntrebare { get; set; }
        public int IdOptiune { get; set; }
        public bool RaspunsCuFlag { get; set; }

        public virtual ICollection<Raspuns> Raspuns { get; set; }
        public virtual Intrebare IdIntrebareNavigation { get; set; }
        public virtual Optiune IdOptiuneNavigation { get; set; }
    }
}
