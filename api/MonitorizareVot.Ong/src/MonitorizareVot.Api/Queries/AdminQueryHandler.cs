using System.Linq;
using System.Threading.Tasks;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Services;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Queries
{
    public class AdminQueryHandler : IAsyncRequestHandler<ApplicationUser, int?>
    {
        private readonly OngContext _context;
        private readonly IHashService _hash;

        public AdminQueryHandler(OngContext context, IHashService hash)
        {
            _context = context;
            _hash = hash;
        }

        public async Task<int?> Handle(ApplicationUser message)
        {
            var hashValue = _hash.GetHash(message.Password);

            var userinfo = _context.AdminOng
                .FirstOrDefault(a => a.Parola == hashValue &&
                                     a.Cont == message.UserName);

            return userinfo?.IdAdminOng;
        }
    }
}
