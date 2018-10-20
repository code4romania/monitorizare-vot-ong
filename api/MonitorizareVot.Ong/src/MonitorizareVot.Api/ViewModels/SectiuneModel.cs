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
                .ForMember(src => src.Raspunsuri, c => c.MapFrom(dest => dest.OptionsToQuestions));

            CreateMap<RaspunsDisponibil, RaspunsDisponibilModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.IdOptionNavigation.Text))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.IdOptionNavigation.IsFreeText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.IdRaspunsDisponibil));
        }   
    }
}
