using MediatR;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class VersiuneFormularCompletModel : VersiuneFormularModel
    {
        public List<SectiuneModel> SectiuniFormular { get; set; }

        public class CreateOrUpdateFormular : IRequest<VersiuneFormularCompletModel>
        {
            public VersiuneFormularCompletModel ToCreateOrUpdate { get; set; }
            public bool isCreatingNew { get; set; }
        }
    }
}