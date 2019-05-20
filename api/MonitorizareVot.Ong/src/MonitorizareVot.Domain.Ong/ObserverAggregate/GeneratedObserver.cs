using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class GeneratedObserver
    {
        public string Id { get; set; }
        public string Pin { get; set; }
    }

    public class ObserverProfile : Profile
    {
        public ObserverProfile()
        {
            CreateMap<Observer, GeneratedObserver>()
                .ForMember(dest => dest.Id, c => c.MapFrom(src => src.Phone))
                .ForMember(dest => dest.Pin, c => c.MapFrom(src => src.Pin));
        }
    }
}
