using AutoMapper;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class JudetStatisticsModel
    {
        public string Nume { get; set; }
        public int Count { get; set; }
    }

    public class SectieStatisticsModel
    {
        public int NumarSectie { get; set; }
        public string CodJudet { get; set; }
        public int Count { get; set; }
    }

    public class StatisticsProfile : Profile
    {
        public StatisticsProfile()
        {
            CreateMap<JudetStatisticsModel, SimpleStatisticsModel>()
                .ForMember(dest => dest.Label, c => c.MapFrom(src => src.Nume))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Count.ToString()));

            CreateMap<SectieStatisticsModel, SimpleStatisticsModel>()
                .ForMember(dest => dest.Label, c => c.MapFrom(src => $"Sectia {src.CodJudet} {src.NumarSectie}"))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Count.ToString()));
        }
    }
}
