using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsDisponibilModel
    {
        public int IdOptiune { get; set; }
        public string TextOptiune { get; set; }
        public bool SeIntroduceText { get; set; }
    }

    public class RaspunsProfile : Profile
    {
        public RaspunsProfile()
        {
            CreateMap<Question, IntrebareModel<RaspunsCompletatModel>>()
              .ForMember(src => src.Raspunsuri, c => c.MapFrom(dest => dest.OptionsToQuestions));

            CreateMap<OptionToQuestion, RaspunsCompletatModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.Option.Text))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.Option.IsFreeText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.RaspunsCuFlag, c => c.MapFrom(src => src.Flagged))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Answers.First().Value));
        }
    }
}
