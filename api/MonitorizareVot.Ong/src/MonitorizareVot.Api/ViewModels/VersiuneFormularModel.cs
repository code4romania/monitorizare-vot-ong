using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class VersiuneFormularModel
    {
        public string CodFormular { get; set; }
        public string StatusFormular { get; set; }
        public int Versiune { get; set; }
        public string Descriere { get; set; }

           public class VersiuniQuery : IRequest<List<VersiuneFormularModel>>
        {
        }
    }
}