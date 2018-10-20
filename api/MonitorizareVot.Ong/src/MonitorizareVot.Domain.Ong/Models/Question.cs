using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class Question
    {
        public Question()
        {
            Notes = new HashSet<Note>();
            OptionsToQuestions = new HashSet<RaspunsDisponibil>();
        }

        public int Id { get; set; }
        public string FormCode { get; set; }
        public string Code { get; set; }
        public int IdSection { get; set; }
        public int QuestionType { get; set; }
        public string Text { get; set; }
        public string Hint { get; set; }

        public virtual ICollection<Note> Notes { get; set; }
        public virtual ICollection<RaspunsDisponibil> OptionsToQuestions { get; set; }
        public virtual Sectiune FormSection { get; set; }
    }
}
