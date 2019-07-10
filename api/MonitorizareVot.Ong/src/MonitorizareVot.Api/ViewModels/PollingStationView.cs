using System.Collections.Generic;
using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class PollingStationView
    {
        public int Id { get; set; }
        public string CountyCode { get; set; }
        public string Address { get; set; }
        public string AdministrativeTerritoryCode { get; set; }
        public int PollingStationNumber { get; set; }
    }

    public class PollingStationProfile : Profile
    {
        public PollingStationProfile()
        {
            CreateMap<PollingStation, PollingStationView>()
                .ForMember(dest => dest.Id, c => c.MapFrom(src => src.Id))
                .ForMember(dest => dest.CountyCode, c => c.MapFrom(src => src.County.Code))
                .ForMember(dest => dest.Address, c => c.MapFrom(src => src.Address))
                .ForMember(dest => dest.AdministrativeTerritoryCode, c => c.MapFrom(src => src.AdministrativeTerritoryCode))
                .ForMember(dest => dest.PollingStationNumber, c => c.MapFrom(src => src.Number));

            CreateMap<PollingStationView, PollingStation>()
                .ForMember(dest => dest.Address, c => c.MapFrom(src => src.Address))
                .ForMember(dest => dest.AdministrativeTerritoryCode, c => c.MapFrom(src => src.AdministrativeTerritoryCode))
                .ForMember(dest => dest.Number, c => c.MapFrom(src => src.PollingStationNumber));
        }
    }

    public class PollingStationQuery : IRequest<PollingStationView>
    {
        public int PollingStationId { get; set; }

        public PollingStationQuery(int id)
        {
            this.PollingStationId = id;
        }
    }

    public class PollingStationViewCommand : IRequest<int>
    {
        public PollingStationView PollingStationView { get; set; }

        public PollingStationViewCommand(PollingStationView view)
        {
            this.PollingStationView = view;
        }
    }

    public class PollingStationUpdateQuery : IRequest<PollingStation>
    {
        public PollingStationView PollingStationView { get; set; }

        public PollingStationUpdateQuery(PollingStationView pollingStationView)
        {
            this.PollingStationView = pollingStationView;
        }
    }

    public class PollingStationPaginatedQuery : IRequest<List<PollingStationView>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PollingStationPaginatedQuery(int pageNo, int pageSize)
        {
            this.PageNumber = pageNo;
            this.PageSize = pageSize;
        }
    }
}