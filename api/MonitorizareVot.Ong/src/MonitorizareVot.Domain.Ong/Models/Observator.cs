using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class Observator
    {
        public Observator()
        {
            Nota = new HashSet<Note>();
            Raspuns = new HashSet<Answer>();
            RaspunsFormular = new HashSet<RaspunsFormular>();
        }

        public int IdObservator { get; set; }
        public bool EsteDinEchipa { get; set; }
        public int IdOng { get; set; }
        public string NumarTelefon { get; set; }
        public string NumeIntreg { get; set; }
        public string Pin { get; set; }
        public string IdDispozitivMobil { get; set; }
        public DateTime? DataInregistrariiDispozitivului { get; set; }

        public virtual ICollection<Note> Nota { get; set; }
        public virtual ICollection<Answer> Raspuns { get; set; }
        public virtual ICollection<RaspunsFormular> RaspunsFormular { get; set; }
        public virtual Ong IdOngNavigation { get; set; }
    }
}
