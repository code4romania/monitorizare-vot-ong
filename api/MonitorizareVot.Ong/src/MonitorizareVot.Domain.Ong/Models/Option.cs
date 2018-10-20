using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class Option
    {
        public Option()
        {
            OptionsToQuestions = new HashSet<RaspunsDisponibil>();
        }

        public int Id { get; set; }
        public bool IsFreeText { get; set; }
        public string Text { get; set; }
        public string Hint { get; set; }

        public virtual ICollection<RaspunsDisponibil> OptionsToQuestions { get; set; }
    }
}
