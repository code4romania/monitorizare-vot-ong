using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class RaspunsDisponibil
    {
        public RaspunsDisponibil()
        {
            Raspuns = new HashSet<Answer>();
        }

        public int IdRaspunsDisponibil { get; set; }
        public int IdIntrebare { get; set; }
        public int IdOptiune { get; set; }
        public bool RaspunsCuFlag { get; set; }

        public virtual ICollection<Answer> Raspuns { get; set; }
        public virtual Question IdIntrebareNavigation { get; set; }
        public virtual Optiune IdOptiuneNavigation { get; set; }
    }
}
