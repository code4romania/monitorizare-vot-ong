using System.Linq;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsCompletatModel
    {
        public int IdOptiune { get; set; }
        public string TextOptiune { get; set; }
        public bool SeIntroduceText { get; set; }
        public string Value { get; set; }
        public bool RaspunsCuFlag { get; set; }
    }

    public class RaspunsProfile : Profile
    {
        public RaspunsProfile()
        {
            CreateMap<Question, IntrebareModel<RaspunsCompletatModel>>()
                .ForMember(dest => dest.Raspunsuri, c => c.MapFrom(src => src.OptionsToQuestions))
                .ForMember(dest => dest.IdIntrebare, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.TextIntrebare, c => c.MapFrom(src => src.Text))
                .ForMember(dest => dest.IdTipIntrebare, c => c.MapFrom(src => src.QuestionType))
                .ForMember(dest => dest.CodIntrebare, c => c.MapFrom(src => src.Code))
                .ForMember(dest => dest.CodFormular, c => c.MapFrom(src => src.FormCode))
                ;

            CreateMap<OptionToQuestion, RaspunsCompletatModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.Option.Text))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.Option.IsFreeText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.RaspunsCuFlag, c => c.MapFrom(src => src.Flagged))
                .ForMember(dest => dest.Value, c => c.MapFrom(src => src.Answers.First().Value));
        }
    }
}
