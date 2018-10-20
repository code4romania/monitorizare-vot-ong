using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SectiuneModel
    {
        public string CodSectiune { get; set; }
        public string Descriere { get; set; }

        public List<IntrebareModel<RaspunsDisponibilModel>> Intrebari { get; set; }
    }

    public class IntrebariQuery : IRequest<List<SectiuneModel>>
    {
        public string CodFormular { get; set; }
    }

    public class FormularProfile : Profile
    {
        public FormularProfile()
        {
            CreateMap<Question, IntrebareModel<RaspunsDisponibilModel>>()
                .ForMember(dest => dest.Raspunsuri, c => c.MapFrom(src => src.OptionsToQuestions))
                .ForMember(dest => dest.IdIntrebare, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.TextIntrebare, c => c.MapFrom(src => src.Text))
                .ForMember(dest => dest.IdTipIntrebare, c => c.MapFrom(src => src.QuestionType))
                .ForMember(dest => dest.CodIntrebare, c => c.MapFrom(src => src.Code))
                .ForMember(dest => dest.CodFormular, c => c.MapFrom(src => src.FormCode))
                ;

            CreateMap<OptionToQuestion, RaspunsDisponibilModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.Option.Text))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.Option.IsFreeText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.Id));
        }   
    }
}
