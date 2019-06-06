using AutoMapper;
using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class SectiuneModel
    {
        public int Id { get; set; }
        public string CodSectiune { get; set; }
        public string Descriere { get; set; }

        public List<IntrebareModel<RaspunsDisponibilModel>> Intrebari { get; set; }
    }

    public class IntrebariQuery : IRequest<FormVersionCompleteModel>
    {
        public string CodFormular { get; set; }
    }

   
}
