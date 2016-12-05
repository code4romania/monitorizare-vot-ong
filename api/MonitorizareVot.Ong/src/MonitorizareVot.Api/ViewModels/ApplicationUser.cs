using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using MonitorizareVot.Ong.Api.Models;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class ApplicationUser : IAsyncRequest<UserInfo>
    {
        [Required(AllowEmptyStrings = false)]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
    }
}
