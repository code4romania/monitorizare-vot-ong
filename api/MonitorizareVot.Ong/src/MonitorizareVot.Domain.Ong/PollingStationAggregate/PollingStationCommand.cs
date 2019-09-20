using System.Collections.Generic;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Domain.Ong.ValueObjects;

namespace MonitorizareVot.Domain.Ong.PollingStationAggregate
{
    public class PollingStationCommand : IRequest<int>
    {
        private readonly List<PollingStationDTO> pollingStationsDTOs;
        public PollingStationCommand(List<PollingStationDTO> list)
        {
            pollingStationsDTOs = new List<PollingStationDTO>();
            foreach(PollingStationDTO element in list)
            {
                this.pollingStationsDTOs.Add(element);
            }
        }

        public List<PollingStationDTO> PollingStationsDTOs => pollingStationsDTOs;
    }
}