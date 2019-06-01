using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class FormVersion
    {
        public string Code { get; set; }
        public int CurrentVersion { get; set; }
        public FormStatus Status { get; set; }
        public string Description { get; set;}
        public virtual ICollection<FormSection> FormSections { get; set; }
    }
}
