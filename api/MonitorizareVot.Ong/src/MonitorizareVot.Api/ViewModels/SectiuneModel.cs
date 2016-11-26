using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SectiuneModel
    {
        public string CodSectiune { get; set; }
        public string Descriere { get; set; }

        public List<IntrebareModel> Intrebari { get; set; }
    }

    public class IntrebariQuery : IAsyncRequest<ApiResponse<List<SectiuneModel>>>
    {
        public string CodFormular { get; set; }
    }

    public class FormularProfile : Profile
    {
        public FormularProfile()
        {
            CreateMap<Intrebare, IntrebareModel>()
                .ForMember(src => src.RaspunsuriDisponibile, c => c.MapFrom(dest => dest.RaspunsDisponibil));

            CreateMap<RaspunsDisponibil, RaspunsCompletatModel>()
                .ForMember(dest => dest.TextOptiune, c => c.MapFrom(src => src.IdOptiuneNavigation.TextOptiune))
                .ForMember(dest => dest.SeIntroduceText, c => c.MapFrom(src => src.IdOptiuneNavigation.SeIntroduceText))
                .ForMember(dest => dest.IdOptiune, c => c.MapFrom(src => src.IdRaspunsDisponibil));
        }   
    }
}
