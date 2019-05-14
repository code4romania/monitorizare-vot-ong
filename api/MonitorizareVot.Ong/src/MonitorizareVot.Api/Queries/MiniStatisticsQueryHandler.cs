using MediatR;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MonitorizareVot.Api.Queries
{
    public class MiniStatisticsQueryHandler :
        IRequestHandler<AnswersRequest, SimpleStatisticsModel>,
        IRequestHandler<StationsVisitedRequest, SimpleStatisticsModel>,
        IRequestHandler<FlaggedAnswersRequest, SimpleStatisticsModel>,
        IRequestHandler<CountiesVisitedRequest, SimpleStatisticsModel>,
        IRequestHandler<NotesUploadedRequest, SimpleStatisticsModel>,
        IRequestHandler<LoggedInObserversRequest, SimpleStatisticsModel>
    {
        private readonly VoteMonitorContext _context;

        public MiniStatisticsQueryHandler(VoteMonitorContext context)
        {
            _context = context;
        }

        public async Task<SimpleStatisticsModel> Handle(AnswersRequest message, CancellationToken token)
        {
            var number = await _context.Answers.CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of answers submitted",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(StationsVisitedRequest message, CancellationToken token)
        {
            var number = await _context.Answers.Select(r => r.IdPollingStation).Distinct().CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of Polling Stations visited",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(CountiesVisitedRequest message, CancellationToken token)
        {
            var number = await _context.Answers.Select(r => r.CountyCode).Distinct().CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of Counties visited",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(NotesUploadedRequest message, CancellationToken token)
        {
            var number = await _context.Notes.CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of notes submitted",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(LoggedInObserversRequest message, CancellationToken token)
        {
            var number = await _context.Observers.CountAsync(o => o.MobileDeviceId != null);
            return new SimpleStatisticsModel
            {
                Label = "Number of logged in Observers",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(FlaggedAnswersRequest message, CancellationToken token)
        {
            var number = await _context.Answers.Include(r=>r.OptionAnswered).CountAsync(r=>r.OptionAnswered.Flagged);
            return new SimpleStatisticsModel
            {
                Label = "Number of flagged answers submitted",
                Value = number.ToString()
            };
        }
    }
}
