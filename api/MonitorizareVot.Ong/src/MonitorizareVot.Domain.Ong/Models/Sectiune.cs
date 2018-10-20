using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class Sectiune
    {
        public Sectiune()
        {
            Intrebare = new HashSet<Question>();
        }

        public int IdSectiune { get; set; }
        public string CodSectiune { get; set; }
        public string Descriere { get; set; }

        public virtual ICollection<Question> Intrebare { get; set; }
    }
}
