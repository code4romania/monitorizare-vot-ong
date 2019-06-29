using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Api.ViewModels
{
    public class OptiuneModel
    {
        public int Id { get; set; }
        public bool SeIntroduceText { get; set; }
        public string Text { get; set; }
        public string Hint { get; set; }
    }

    public class OptionsQuery : IRequest<List<OptiuneModel>>
    {

    } 

    public class OptiuneModelRequest: IRequest<int>
    {
        public OptiuneModel OptiuneModel { get; set; }

        public OptiuneModelRequest(OptiuneModel model)
        {
            this.OptiuneModel = model;
        }
    }

    public class OptiuneProfile: Profile
    {
        public OptiuneProfile()
        {
            CreateMap<OptiuneModel, Option>()
                .ForMember(dest => dest.Text, c => c.MapFrom(src => src.Text))
                .ForMember(dest => dest.IsFreeText, c => c.MapFrom(src => src.SeIntroduceText))
                .ForMember(dest => dest.Hint, c => c.MapFrom(src => src.Hint));
        }
    }
}
