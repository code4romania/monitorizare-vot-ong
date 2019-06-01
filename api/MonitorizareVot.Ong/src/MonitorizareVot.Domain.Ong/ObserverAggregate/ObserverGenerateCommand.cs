using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace MonitorizareVot.Domain.Ong.ObserverAggregate
{
    public class ObserverGenerateCommand : IRequest<List<GeneratedObserver>>
    {
        public ObserverGenerateCommand(int NrObs, int Id)
        {
            NrObservers = NrObs;
            IdNgo = Id;
        }

        public int NrObservers { get; set; }
        public int IdNgo { get; set; }
    }

    public class ObserverGenerateProperties : IRequest<ObserverGenerateCommand>
    {
        public ObserverGenerateProperties(int number)
        {
            NrObservers = number;
        }

        public int NrObservers { get; set; }
        public int IdNgo { get; set; }
    }
}
