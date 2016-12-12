using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class FiltruStatisticiSimple : PagingModel
    {
        public string Formular { get; set; }
        public TipGrupareStatistici Grupare { get; set; }
    }

    public class StatisticsProfile : Profile
    {
        public StatisticsProfile()
        {
            CreateMap<StatisticiCompuse, SimpleStatisticsModel>()
                .ForMember(dest => dest.Label, c => c.MapFrom(src => $"Sectia {src.Cod} {src.Label}"))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Value.ToString()));

            CreateMap<StatisticiSimple, SimpleStatisticsModel>()
               .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Value.ToString()));
        }
    }
}
