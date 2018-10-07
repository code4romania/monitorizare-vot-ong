using MediatR;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Api.ViewModels
{
    public class AnswersRequest : IRequest<SimpleStatisticsModel>
    {
    }
    public class StationsVisitedRequest : IRequest<SimpleStatisticsModel>
    {
    }
    public class FlaggedAnswersRequest : IRequest<SimpleStatisticsModel>
    {
    }
    public class CountiesVisitedRequest : IRequest<SimpleStatisticsModel>
    {
    }
    public class NotesUploadedRequest : IRequest<SimpleStatisticsModel>
    {
    }
    public class LoggedInObserversRequest : IRequest<SimpleStatisticsModel>
    {
    }
}
