using MediatR;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class FormVersionCompleteModel : FormVersionModel
    {
        public List<SectiuneModel> SectiuniFormular { get; set; }

        public class CreateOrUpdateFormRequest : IRequest<FormVersionCompleteModel>
        {
            public FormVersionCompleteModel ToCreateOrUpdate { get; set; }
            public bool isCreatingNew { get; set; }
        }
    }
}