using MediatR;
using System;
using System.Collections.Generic;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsFormularModel
    {
        public DateTime DataUltimeiModificari { get; set; }
        public bool? EsteZonaUrbana { get; set; }
        public DateTime? OraPlecarii { get; set; }
        public DateTime? OraSosirii { get; set; }
        public bool? PresedinteBesvesteFemeie { get; set; }
    }

    public class RaspunsFomularProfile : Profile
    {
        public RaspunsFomularProfile()
        {
            CreateMap<PollingStationInfo, RaspunsFormularModel>()
                .ForMember(dest => dest.DataUltimeiModificari, o => o.MapFrom(src => src.LastModified))
                .ForMember(dest => dest.EsteZonaUrbana, o => o.MapFrom(src => src.UrbanArea))
                .ForMember(dest => dest.OraPlecarii, o => o.MapFrom(src => src.ObserverLeaveTime))
                .ForMember(dest => dest.OraSosirii, o => o.MapFrom(src => src.ObserverArrivalTime))
                .ForMember(dest => dest.PresedinteBesvesteFemeie, o => o.MapFrom(src => src.IsPollingStationPresidentFemale))
                ;
        }
    }

    public class RaspunsuriFormularQuery : IRequest<RaspunsFormularModel>
    {
        public int IdSectieDeVotare { get; set; }
        public int IdObservator { get; set; }
    }
}
