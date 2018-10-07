using MediatR;
using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Api.ViewModels;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.ViewModels;
using System.Linq;
using System.Threading.Tasks;

namespace MonitorizareVot.Api.Queries
{
    public class MiniStatisticsQueryHandler :
        IAsyncRequestHandler<AnswersRequest, SimpleStatisticsModel>,
        IAsyncRequestHandler<StationsVisitedRequest, SimpleStatisticsModel>,
        IAsyncRequestHandler<FlaggedAnswersRequest, SimpleStatisticsModel>,
        IAsyncRequestHandler<CountiesVisitedRequest, SimpleStatisticsModel>,
        IAsyncRequestHandler<NotesUploadedRequest, SimpleStatisticsModel>,
        IAsyncRequestHandler<LoggedInObserversRequest, SimpleStatisticsModel>
    {
        private readonly OngContext _context;

        public MiniStatisticsQueryHandler(OngContext context)
        {
            _context = context;
        }

        public async Task<SimpleStatisticsModel> Handle(AnswersRequest message)
        {
            var number = await _context.Raspuns.CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of answers submitted",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(StationsVisitedRequest message)
        {
            var number = await _context.Raspuns.Select(r => r.IdSectieDeVotare).Distinct().CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of Polling Stations visited",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(CountiesVisitedRequest message)
        {
            var number = await _context.Raspuns.Select(r => r.CodJudet).Distinct().CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of Counties visited",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(NotesUploadedRequest message)
        {
            var number = await _context.Nota.CountAsync();
            return new SimpleStatisticsModel
            {
                Label = "Number of notes submitted",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(LoggedInObserversRequest message)
        {
            var number = await _context.Observator.CountAsync(o => o.IdDispozitivMobil != null);
            return new SimpleStatisticsModel
            {
                Label = "Number of logged in Observers",
                Value = number.ToString()
            };
        }
        public async Task<SimpleStatisticsModel> Handle(FlaggedAnswersRequest message)
        {
            var number = await _context.Raspuns.Include(r=>r.IdRaspunsDisponibilNavigation).CountAsync(r=>r.IdRaspunsDisponibilNavigation.RaspunsCuFlag);
            return new SimpleStatisticsModel
            {
                Label = "Number of flagged answers submitted",
                Value = number.ToString()
            };
        }
    }
}
