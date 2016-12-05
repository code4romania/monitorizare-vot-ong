using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Models;
using MonitorizareVot.Ong.Api.Services;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class AdminQueryHandler : IAsyncRequestHandler<ApplicationUser, UserInfo>
    {
        private readonly OngContext _context;
        private readonly IHashService _hash;

        public AdminQueryHandler(OngContext context, IHashService hash)
        {
            _context = context;
            _hash = hash;
        }

        public async Task<UserInfo> Handle(ApplicationUser message)
        {
            var hashValue = _hash.GetHash(message.Password);

            var userinfo = _context.AdminOng
                .Where(a => a.Parola == hashValue &&
                                     a.Cont == message.UserName)
                                     .Select(Mapper.Map<UserInfo>)
                                     .FirstOrDefault();

            return userinfo;
        }
    }
}
