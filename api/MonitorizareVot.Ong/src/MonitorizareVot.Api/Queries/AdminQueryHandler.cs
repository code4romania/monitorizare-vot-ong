using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Models;
using MonitorizareVot.Ong.Api.Services;
using MonitorizareVot.Ong.Api.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class AdminQueryHandler : IRequestHandler<ApplicationUser, UserInfo>
    {
        private readonly VoteMonitorContext _context;
        private readonly IHashService _hash;

        public AdminQueryHandler(VoteMonitorContext context, IHashService hash)
        {
            _context = context;
            _hash = hash;
        }

        public async Task<UserInfo> Handle(ApplicationUser message, CancellationToken token)
        {
            var hashValue = _hash.GetHash(message.Password);

            var userinfo = _context.NgoAdmins
                .Include(a => a.Ngo)
                .Where(a => a.Password == hashValue &&
                                     a.Account == message.UserName)
                                     .Select(Mapper.Map<UserInfo>)
                                     .FirstOrDefault();

            return await Task.FromResult(userinfo);
        }
    }
}
