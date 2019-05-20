using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ResetPasswordCommand : IRequest<string>
    {
        public ResetPasswordCommand(int id, string phone)
        {
            IdNgo = id;
            PhoneNumber = phone;
        }
        public int IdNgo;
        public string PhoneNumber;
    }
}
