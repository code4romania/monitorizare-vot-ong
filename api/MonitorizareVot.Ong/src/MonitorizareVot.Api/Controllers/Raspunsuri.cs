using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;

namespace MonitorizareVot.Ong.Api.Controllers
{
    [Route("api/v1/raspunsuri")]
    public class Raspunsuri : Controller
    {
        [HttpGet()]
        public async Task<Raspuns<ListaRaspunsuri<RaspunsuriModel>>> Urgente(FiltruRaspunsuriModel model)
        {
            return await Task.FromResult(new Raspuns<ListaRaspunsuri<RaspunsuriModel>>
            {
                EsteValid = true,
                Data = new ListaRaspunsuri<RaspunsuriModel>
                {
                    Data = new List<RaspunsuriModel> {
                        new RaspunsuriModel {Observator = "Ionescu Vasile", Sectie = "BU 123", IdSectie = 2},
                        new RaspunsuriModel {Observator = "Popescu Ionut", Sectie = "BU 123", IdSectie = 2},
                        new RaspunsuriModel {Observator = "Ionescu Maria", Sectie = "CT 13", IdSectie = 76},
                        new RaspunsuriModel {Observator = "ALbertin Merisor", Sectie = "IS 13", IdSectie = 67},
                        new RaspunsuriModel {Observator = "Vasilian Cristi", Sectie = "IS 123", IdSectie = 66},
                        new RaspunsuriModel {Observator = "Zorii Maria", Sectie = "CT 143", IdSectie = 78},
                        new RaspunsuriModel {Observator = "Gheorghe Marian", Sectie = "CT 6", IdSectie = 77},
                        new RaspunsuriModel {Observator = "Ionescu Vasile", Sectie = "BU 124", IdSectie = 88},
                        new RaspunsuriModel {Observator = "Cernica Maria", Sectie = "GR 99", IdSectie = 98},
                        new RaspunsuriModel {Observator = "Vlasceanu Ionut", Sectie = "TM 33", IdSectie = 99},
                },
                    Page = 1,
                    PageSize = 10,
                    Total = 300
                }
            });
        }
    }
}