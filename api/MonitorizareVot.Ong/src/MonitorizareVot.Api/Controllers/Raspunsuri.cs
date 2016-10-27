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
                        new RaspunsuriModel {Observator = "Ionescu Vasile", Sectie = "BU 123", IdSectie = 2, IdObservator = 112},
                        new RaspunsuriModel {Observator = "Popescu Ionut", Sectie = "BU 123", IdSectie = 2, IdObservator = 111},
                        new RaspunsuriModel {Observator = "Ionescu Maria", Sectie = "CT 13", IdSectie = 76, IdObservator = 10},
                        new RaspunsuriModel {Observator = "ALbertin Merisor", Sectie = "IS 13", IdSectie = 67, IdObservator = 113},
                        new RaspunsuriModel {Observator = "Vasilian Cristi", Sectie = "IS 123", IdSectie = 66, IdObservator = 114},
                        new RaspunsuriModel {Observator = "Zorii Maria", Sectie = "CT 143", IdSectie = 78, IdObservator = 115},
                        new RaspunsuriModel {Observator = "Ionescu Maria", Sectie = "CT 6", IdSectie = 77, IdObservator = 10},
                        new RaspunsuriModel {Observator = "Ionescu Vasile", Sectie = "BU 124", IdSectie = 88, IdObservator = 144},
                        new RaspunsuriModel {Observator = "Cernica Maria", Sectie = "GR 99", IdSectie = 98, IdObservator = 143},
                        new RaspunsuriModel {Observator = "Vlasceanu Ionut", Sectie = "TM 33", IdSectie = 99, IdObservator = 143},
                },
                    Page = 1,
                    PageSize = 10,
                    Total = 300
                }
            });
        }
    }
}