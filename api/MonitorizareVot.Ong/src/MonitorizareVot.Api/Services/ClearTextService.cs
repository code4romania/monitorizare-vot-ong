using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MonitorizareVot.Ong.Api.Models;
using MonitorizareVot.Ong.Api.Services;

namespace MonitorizareVot.Api.Services
{
    public class ClearTextService : IHashService
    {
        public ClearTextService(IOptions<HashOptions> options)
        {
            Salt = options.Value.Salt;
        }
        public string Salt { get; set; }
        public string GetHash(string clearString)
        {
            return clearString;
        }
    }
}
