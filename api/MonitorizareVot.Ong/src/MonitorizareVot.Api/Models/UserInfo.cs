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
        public int IdOng { get; set; }
        public bool Organizator { get; set; }
    }

    public class UserInfoProfile : Profile
    {
        public UserInfoProfile()
        {
            CreateMap<AdminOng, UserInfo>()
                .ForMember(u => u.IdOng, opt => opt.MapFrom(a => a.IdOng))
                .ForMember(u => u.Organizator, opt => opt.MapFrom(a => a.IdOngNavigation.Organizator));
        }   
    }
}
