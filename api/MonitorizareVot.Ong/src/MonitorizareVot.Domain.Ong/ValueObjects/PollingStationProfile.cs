using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Domain.Ong.ValueObjects
    {
        public class PollingStationProfile : Profile
        {
            public PollingStationProfile()
            {
                CreateMap<PollingStationDTO, PollingStation>()
                    .ForMember(dest => dest.Address, c => c.MapFrom(source => source.Adresa))
                    .ForMember(dest => dest.Number, c => c.MapFrom(source => source.NrSV))
                    .ForMember(dest => dest.AdministrativeTerritoryCode, c => c.MapFrom(source => source.CodSiruta));
            }
        }
    }