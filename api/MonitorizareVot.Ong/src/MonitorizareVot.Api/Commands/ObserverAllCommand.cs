using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ObserverAllCommand : IRequest<List<Observer>>
    {
        public ObserverAllCommand()
        {
        }
    }
}
