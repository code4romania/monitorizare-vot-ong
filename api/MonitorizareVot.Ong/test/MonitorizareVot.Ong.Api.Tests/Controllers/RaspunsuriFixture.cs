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

            using (var context = new OngContext(ContextOptions))
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

        private void SeedOngs(OngContext context)
        {
            if (context.Ong.Any())
                return;

            context.Ong.AddRange(
                 new Domain.Ong.Models.Ong { IdOng = 1, NumeOng = "Denumire ONG A", AbreviereNumeOng = "ONG A" },
                 new Domain.Ong.Models.Ong { IdOng = 2, NumeOng = "Denumire ONG B", AbreviereNumeOng = "ONG B" },
                 new Domain.Ong.Models.Ong { IdOng = 3, NumeOng = "Denumire ONG C", AbreviereNumeOng = "ONG C" },
                 new Domain.Ong.Models.Ong { IdOng = 4, NumeOng = "Denumire ONG D", AbreviereNumeOng = "ONG D" },
                 new Domain.Ong.Models.Ong { IdOng = 5, NumeOng = "Denumire ONG E", AbreviereNumeOng = "ONG E" },
                 new Domain.Ong.Models.Ong { IdOng = 6, NumeOng = "Denumire ONG F", AbreviereNumeOng = "ONG F" }
             );

            context.SaveChanges();
        }

        private void SeedSectiiDeVotare(OngContext context, int idJudet)
        {
            if (context.SectieDeVotare.Any(a => a.IdJudet == idJudet))
                return;

            context.SectieDeVotare.AddRange(
                 new SectieDeVotare { IdSectieDeVotarre = idJudet * 10 + 1, IdJudet = idJudet, DenumireUat = $"Sectia {idJudet * 10 + 1}", NumarSectie = 1, LocalitateComponenta = $"Localitate {idJudet * 10 + 1}" },
                 new SectieDeVotare { IdSectieDeVotarre = idJudet * 10 + 2, IdJudet = idJudet, DenumireUat = $"Sectia {idJudet * 10 + 2}", NumarSectie = 2, LocalitateComponenta = $"Localitate {idJudet * 10 + 2}" },
                 new SectieDeVotare { IdSectieDeVotarre = idJudet * 10 + 3, IdJudet = idJudet, DenumireUat = $"Sectia {idJudet * 10 + 3}", NumarSectie = 3, LocalitateComponenta = $"Localitate {idJudet * 10 + 3}" },
                 new SectieDeVotare { IdSectieDeVotarre = idJudet * 10 + 4, IdJudet = idJudet, DenumireUat = $"Sectia {idJudet * 10 + 4}", NumarSectie = 4, LocalitateComponenta = $"Localitate {idJudet * 10 + 4}" },
                 new SectieDeVotare { IdSectieDeVotarre = idJudet * 10 + 5, IdJudet = idJudet, DenumireUat = $"Sectia {idJudet * 10 + 5}", NumarSectie = 5, LocalitateComponenta = $"Localitate {idJudet * 10 + 5}" }
             );

            context.SaveChanges();
        }

        private void SeedObservatoriCuRaspunsuri(OngContext context, int idOng)
        {
            if (context.Observator.Any(a => a.IdOng == idOng))
                return;

            var listaObservatori = new List<Observator>
            {
                new Observator { IdOng = idOng, NumeIntreg = "Popescu Florin", NumarTelefon = "0763000000", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Cremarenco Alin", NumarTelefon = "0763000001", EsteDinEchipa = false },
                new Observator { IdOng = idOng, NumeIntreg = "Chivu Marin", NumarTelefon = "0763000002", EsteDinEchipa = false },
                new Observator { IdOng = idOng, NumeIntreg = "Neacsu Andreea", NumarTelefon = "0763000004", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Stanciu Florina", NumarTelefon = "0763000003", EsteDinEchipa = false },
                new Observator { IdOng = idOng, NumeIntreg = "Neacsu Andreea", NumarTelefon = "0763000004", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Duta Andrei", NumarTelefon = "0763000005", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Vlad George", NumarTelefon = "0763000007", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Pascu Dan", NumarTelefon = "0763000008", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Stan Stefan", NumarTelefon = "0763000010", EsteDinEchipa = true },
                new Observator { IdOng = idOng, NumeIntreg = "Petrache Razvan", NumarTelefon = "0763000011", EsteDinEchipa = false },
                new Observator { IdOng = idOng, NumeIntreg = "Dumbrava Valeria",  NumarTelefon = "0763000009", EsteDinEchipa = true }
            };

            context.Observator.AddRange(listaObservatori);

            var listaRaspunsuri = new List<Answer>
            {
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[0].IdObservator, IdOptionToQuestion = 'B' * 20 + 12, IdPollingStation = 11, LastModified = DateTime.Now.AddMinutes(10) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'A' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'C' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'C' * 20 + 5, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'C' * 20 + 9, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[1].IdObservator, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'A' * 20 + 3, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'A' * 20 + 10, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'C' * 20 + 2, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'C' * 20 + 4, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'C' * 20 + 8, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 12, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[2].IdObservator, IdOptionToQuestion = 'B' * 20 + 10, IdPollingStation = 13, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[3].IdObservator, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].IdObservator, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[3].IdObservator, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].IdObservator, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].IdObservator, IdOptionToQuestion = 'A' * 20 + 8, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[4].IdObservator, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].IdObservator, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].IdObservator, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].IdObservator, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[5].IdObservator, IdOptionToQuestion = 'B' * 20 + 13, IdPollingStation = 14, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'A' * 20 + 2, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'A' * 20 + 4, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'B' * 20 + 9, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[6].IdObservator, IdOptionToQuestion = 'B' * 20 + 12, IdPollingStation = 15, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'A' * 20 + 7, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'A' * 20 + 13, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(40) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'B' * 20 + 2, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'B' * 20 + 4, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[7].IdObservator, IdOptionToQuestion = 'B' * 20 + 11, IdPollingStation = 25, LastModified = DateTime.Now.AddMinutes(-25) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'A' * 20 + 1, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'A' * 20 + 9, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(30) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 3, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 7, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'B' * 20 + 1, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'B' * 20 + 5, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'B' * 20 + 8, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'B' * 20 + 11, IdPollingStation = 22, LastModified = DateTime.Now.AddMinutes(20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 3, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 6, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 8, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[8].IdObservator, IdOptionToQuestion = 'C' * 20 + 12, IdPollingStation = 23, LastModified = DateTime.Now.AddMinutes(-20) },
                new Answer { IdObserver = listaObservatori[9].IdObservator, IdOptionToQuestion = 'C' * 20 + 1, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].IdObservator, IdOptionToQuestion = 'A' * 20 + 5, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].IdObservator, IdOptionToQuestion = 'A' * 20 + 9, IdPollingStation = 11, LastModified = DateTime.Now },
                new Answer { IdObserver = listaObservatori[9].IdObservator, IdOptionToQuestion = 'A' * 20 + 11, IdPollingStation = 11, LastModified = DateTime.Now },
            };

            context.Raspuns.AddRange(listaRaspunsuri);

            context.SaveChanges();
        }
    }
}
