using MediatR;
using MonitorizareVot.Domain.Ong.Models;
using System.Collections.Generic;

namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class FormVersionModel
    {
        public string FormCode { get; set; }
        public string FormStatus { get; set; }
        public int Version { get; set; }
        public string Description { get; set; }

           public class FormVersionsQuery : IRequest<List<FormVersionModel>>
        {
        }
    }
}