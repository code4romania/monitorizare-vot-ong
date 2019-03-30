using MediatR;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Api.ViewModels
{
    public class GetObserversRequest : PagingModel, IRequest<ApiListResponse<ObserverModel>>
    { }
}