using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ResetDeviceCommand : IRequest<int>
    {
        public ResetDeviceCommand(int id, string phone)
        {
            IdNgo = id;
            PhoneNumber = phone;
        }

        public int IdNgo;
        public string PhoneNumber;
    }
}
