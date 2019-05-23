using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Ong.Api.Models
{
    public class UserInfo
    {
        public int IdNgo { get; set; }
        public bool Organizer { get; set; }
    }

    public class UserInfoProfile : Profile
    {
        public UserInfoProfile()
        {
            CreateMap<NgoAdmin, UserInfo>()
                .ForMember(u => u.IdNgo, opt => opt.MapFrom(a => a.IdNgo))
                .ForMember(u => u.Organizer, opt => opt.MapFrom(a => a.Ngo.Organizer));
        }   
    }
}
