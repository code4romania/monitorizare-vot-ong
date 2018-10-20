using MonitorizareVot.Domain.Ong.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MonitorizareVot.Ong.Api.Tests.Controllers
{
    public class RaspunsuriFixture : ControllerFixture<Startup>
    {
        public RaspunsuriFixture() : base("Raspunsuri")
        {
        }

        public override void SeedData()
        {
            base.SeedData();

            using (var context = new VoteMonitorContext(ContextOptions))
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    SeedOngs(context);
                    SeedSectiiDeVotare(context, 1);
                    SeedSectiiDeVotare(context, 2);
                    SeedSectiiDeVotare(context, 3);
                    SeedSectiiDeVotare(context, 4);
                    SeedSectiiDeVotare(context, 5);
                    SeedObservatoriCuRaspunsuri(context, 1);
                    SeedObservatoriCuRaspunsuri(context, 2);
                    SeedObservatoriCuRaspunsuri(context, 3);
                    SeedObservatoriCuRaspunsuri(context, 4);
                    SeedObservatoriCuRaspunsuri(context, 5);
                    SeedObservatoriCuRaspunsuri(context, 6);

                    tran.Commit();
                }
            }
        }

        private void SeedOngs(VoteMonitorContext context)
        {
            if (context.Ngos.Any())
                return;

            context.Ngos.AddRange(
                 new Domain.Ong.Models.Ngo { Id = 1, Name = "Denumire ONG A", ShortName = "ONG A" },
                 new Domain.Ong.Models.Ngo { Id = 2, Name = "Denumire ONG B", ShortName = "ONG B" },
                 new Domain.Ong.Models.Ngo { Id = 3, Name = "Denumire ONG C", ShortName = "ONG C" },
                 new Domain.Ong.Models.Ngo { Id = 4, Name = "Denumire ONG D", ShortName = "ONG D" },
                 new Domain.Ong.Models.Ngo { Id = 5, Name = "Denumire ONG E", ShortName = "ONG E" },
                 new Domain.Ong.Models.Ngo { Id = 6, Name = "Denumire ONG F", ShortName = "ONG F" }
             );

            context.SaveChanges();
        }

        private void SeedSectiiDeVotare(VoteMonitorContext context, int idJudet)
        {
            if (context.PollingStations.Any(a => a.IdCounty == idJudet))
                return;

            context.PollingStations.AddRange(
                 new PollingStation { Id = idJudet * 10 + 1, IdCounty = idJudet, AdministrativeTerritoryCode = $"Sectia {idJudet * 10 + 1}", Number = 1, TerritoryCode = $"Localitate {idJudet * 10 + 1}" },
                 new PollingStation { Id = idJudet * 10 + 2, IdCounty = idJudet, AdministrativeTerritoryCode = $"Sectia {idJudet * 10 + 2}", Number = 2, TerritoryCode = $"Localitate {idJudet * 10 + 2}" },
                 new PollingStation { Id = idJudet * 10 + 3, IdCounty = idJudet, AdministrativeTerritoryCode = $"Sectia {idJudet * 10 + 3}", Number = 3, TerritoryCode = $"Localitate {idJudet * 10 + 3}" },
                 new PollingStation { Id = idJudet * 10 + 4, IdCounty = idJudet, AdministrativeTerritoryCode = $"Sectia {idJudet * 10 + 4}", Number = 4, TerritoryCode = $"Localitate {idJudet * 10 + 4}" },
                 new PollingStation { Id = idJudet * 10 + 5, IdCounty = idJudet, AdministrativeTerritoryCode = $"Sectia {idJudet * 10 + 5}", Number = 5, TerritoryCode = $"Localitate {idJudet * 10 + 5}" }
             );

            context.SaveChanges();
        }

        private void SeedObservatoriCuRaspunsuri(VoteMonitorContext context, int idOng)
        {
            if (context.Observers.Any(a => a.IdNgo == idOng))
                return;

            var listaObservatori = new List<Observer>
            {
                new Observer { IdNgo = idOng, Name = "Popescu Florin", Phone = "0763000000", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Cremarenco Alin", Phone = "0763000001", FromTeam = false },
                new Observer { IdNgo = idOng, Name = "Chivu Marin", Phone = "0763000002", FromTeam = false },
                new Observer { IdNgo = idOng, Name = "Neacsu Andreea", Phone = "0763000004", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Stanciu Florina", Phone = "0763000003", FromTeam = false },
                new Observer { IdNgo = idOng, Name = "Neacsu Andreea", Phone = "0763000004", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Duta Andrei", Phone = "0763000005", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Vlad George", Phone = "0763000007", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Pascu Dan", Phone = "0763000008", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Stan Stefan", Phone = "0763000010", FromTeam = true },
                new Observer { IdNgo = idOng, Name = "Petrache Razvan", Phone = "0763000011", FromTeam = false },
                new Observer { IdNgo = idOng, Name = "Dumbrava Valeria",  Phone = "0763000009", FromTeam = true }
            };

            context.Observers.AddRange(listaObservatori);

            var listaRaspunsuri = new List<Answer>
            {
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].Id, IdOptionToQuestion = 'B' * 20 + 12, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'A' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'C' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'C' * 20 + 5, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'C' * 20 + 9, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].Id, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'A' * 20 + 3, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'A' * 20 + 10, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'C' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'C' * 20 + 4, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'C' * 20 + 8, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].Id, IdOptionToQuestion = 'B' * 20 + 10, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[3].Id, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].Id, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].Id, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].Id, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].Id, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].Id, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].Id, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].Id, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].Id, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].Id, IdOptionToQuestion = 'B' * 20 + 13, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'A' * 20 + 2, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].Id, IdOptionToQuestion = 'B' * 20 + 12, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'B' * 20 + 4, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].Id, IdOptionToQuestion = 'B' * 20 + 11, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'A' * 20 + 9, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 3, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 7, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'B' * 20 + 11, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 3, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 6, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 8, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].Id, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[9].Id, IdOptionToQuestion = 'C' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].Id, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].Id, IdOptionToQuestion = 'A' * 20 + 9, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].Id, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 11, LastModified = DateTime.Now },
            };

            context.Answers.AddRange(listaRaspunsuri);

            context.SaveChanges();
        }
    }
}
