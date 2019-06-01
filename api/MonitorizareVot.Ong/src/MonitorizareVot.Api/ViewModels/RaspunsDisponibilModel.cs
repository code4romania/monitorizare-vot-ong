using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;
using System.Linq;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class RaspunsDisponibilModel
    {
        public int IdOptiune { get; set; }
        public int IdIntrebare { get; set; }
        public string TextOptiune { get; set; }
        public bool SeIntroduceText { get; set; }
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
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.IdIntrebare, c => c.MapFrom(src => src.IdOption));

            CreateMap<FormVersion, VersiuneFormularCompletModel>()
                .ForMember(dest => dest.SectiuniFormular, c => c.MapFrom(src => src.FormSections))
                .ForMember(dest => dest.CodFormular, c => c.MapFrom(src => src.Code))
                .ForMember(dest => dest.Descriere, c => c.MapFrom(src => src.Description))
                .ForMember(dest => dest.StatusFormular, c => c.MapFrom(src => src.Status))
                .ForMember(dest => dest.Versiune, c => c.MapFrom(src => src.CurrentVersion));

            CreateMap<FormSection, SectiuneModel>()
                .ForMember(dest => dest.CodSectiune, c => c.MapFrom(src => src.Code))
                .ForMember(dest => dest.Descriere, c => c.MapFrom(src => src.Description))
                .ForMember(dest => dest.Id, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.Intrebari, c => c.MapFrom(src => src.Questions));

            CreateMap<VersiuneFormularCompletModel, FormVersion>()
                .ForMember(dest => dest.Code, c => c.MapFrom(src => src.CodFormular))
                .ForMember(dest => dest.CurrentVersion, c => c.MapFrom(src => src.Versiune))
                .ForMember(dest => dest.Status, c => c.MapFrom(src => src.StatusFormular))
                .ForMember(dest => dest.Description, c => c.MapFrom(src => src.Descriere))
                .ForMember(dest => dest.FormSections, c => c.MapFrom(src => src.SectiuniFormular));

            CreateMap<SectiuneModel, FormSection>()
                .ForMember(dest => dest.Code, c => c.MapFrom(src => src.CodSectiune))
                .ForMember(dest => dest.Description, c => c.MapFrom(src => src.Descriere))
                .ForMember(dest => dest.Id, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.Questions, c => c.MapFrom(src => src.Intrebari));

            CreateMap<IntrebareModel<RaspunsDisponibilModel>, Question>()
                .ForMember(dest => dest.Id, c => c.MapFrom(src => src.IdIntrebare))
                .ForMember(dest => dest.Text, c => c.MapFrom(src => src.TextIntrebare))
                .ForMember(dest => dest.QuestionType, c => c.MapFrom(src => src.IdTipIntrebare))
                .ForMember(dest => dest.Code, c => c.MapFrom(src => src.CodIntrebare))
                .ForMember(dest => dest.FormCode, c => c.MapFrom(src => src.CodFormular))
                .ForMember(dest => dest.OptionsToQuestions, c => c.MapFrom(src => src.Raspunsuri));

            CreateMap<RaspunsDisponibilModel, OptionToQuestion>()
                .ForMember(src => src.IdOption, c => c.MapFrom(src => src.IdOptiune))
                .ForMember(src => src.IdQuestion, c => c.MapFrom(src => src.IdIntrebare));

        }
    }
}
