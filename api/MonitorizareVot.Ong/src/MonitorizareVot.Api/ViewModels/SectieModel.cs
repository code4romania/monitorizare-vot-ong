using AutoMapper;
using System;

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
        }
    }
}
