using System;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class County
    {
        public County()
        {
            PollingStations = new HashSet<PollingStation>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int NumberOfPollingStations { get; set; }

        public virtual ICollection<PollingStation> PollingStations { get; set; }
    }
}
