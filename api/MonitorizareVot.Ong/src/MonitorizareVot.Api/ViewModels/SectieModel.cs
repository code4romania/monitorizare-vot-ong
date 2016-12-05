using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System;
using System.Linq;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SectieModel
    {
        public string Sectie { get; set; }

        public string Observator { get; set; }

        public int IdSectie { get; set; }

        public int IdObservator { get; set; }

        public string CodJudet { get; set; }

        public int NumarSectie { get; set; }

        public DateTime DataUltimeiModificari { get; set; }
    }

    public class RaspunsProfile : Profile
    {
        public RaspunsProfile()
        {
            CreateMap<SectieModel, RaspunsModel>()
                .ForMember(dest => dest.Sectie, c => c.MapFrom(src => $"{src.CodJudet} {src.NumarSectie}"));

            CreateMap<Intrebare, IntrebareModel<RaspunsCompletatModel>>()
              .ForMember(src => src.Raspunsuri, c => c.MapFrom(dest => dest.RaspunsDisponibil));

            CreateMap<RaspunsDisponibil, RaspunsCompletatModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.IdOptiuneNavigation.TextOptiune))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.IdOptiuneNavigation.SeIntroduceText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.IdRaspunsDisponibil))
                .ForMember(dest => dest.RaspunsCuFlag, c => c.MapFrom(src => src.RaspunsCuFlag))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Raspuns.First().Value));
        }
    }
}
