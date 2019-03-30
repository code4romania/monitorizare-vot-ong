using MediatR;
using MonitorizareVot.Ong.Api.Extensions;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class GetFormsRequest: PagingModel, IRequest<ApiListResponse<SectiuneModel>>
    {
    }
}