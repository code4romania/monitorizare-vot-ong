using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using MonitorizareVot.Domain.Ong.ValueObjects;

namespace MonitorizareVot.Domain.Ong.Models
{
    public static class OngContextExtensions
    {
        public static void EnsureSeedData(this OngContext context)
        {
            if (!context.AllMigrationsApplied())
                return;

            using (var tran = context.Database.BeginTransaction())
            {
                context.DataCleanUp();

                context.SeedVersions();
                context.SeedJudete();
                context.SeedSectiune();
                context.SeedOptiuni();
                context.SeedQuestions('A');
                context.SeedQuestions('B');
                context.SeedQuestions('C');

                tran.Commit();
            }
        }

        private static void SeedJudete(this OngContext context)
        {
            if (context.Judet.Any())
                return;

            context.Judet.AddRange(
                new County { Id = 0, Code = "AB", Name = "ALBA" },
                new County { Id = 1, Code = "AR", Name = "ARAD" },
                new County { Id = 2, Code = "AG", Name = "ARGES" },
                new County { Id = 3, Code = "BC", Name = "BACAU" },
                new County { Id = 4, Code = "BH", Name = "BIHOR" },
                new County { Id = 5, Code = "BN", Name = "BISTRITA-NASAUD" },
                new County { Id = 6, Code = "BT", Name = "BOTOSANI" },
                new County { Id = 7, Code = "BV", Name = "BRASOV" },
                new County { Id = 8, Code = "BR", Name = "BRAILA" },
                new County { Id = 9, Code = "BZ", Name = "BUZAU" },
                new County { Id = 10, Code = "CS", Name = "CARAS-SEVERIN" },
                new County { Id = 11, Code = "CL", Name = "CALARASI" },
                new County { Id = 12, Code = "CJ", Name = "CLUJ" },
                new County { Id = 13, Code = "CT", Name = "CONSTANTA" },
                new County { Id = 14, Code = "CV", Name = "COVASNA" },
                new County { Id = 15, Code = "DB", Name = "DÂMBOVITA" },
                new County { Id = 16, Code = "DJ", Name = "DOLJ" },
                new County { Id = 17, Code = "GL", Name = "GALATI" },
                new County { Id = 18, Code = "GR", Name = "GIURGIU" },
                new County { Id = 19, Code = "GJ", Name = "GORJ" },
                new County { Id = 20, Code = "HR", Name = "HARGHITA" },
                new County { Id = 21, Code = "HD", Name = "HUNEDOARA" },
                new County { Id = 22, Code = "IL", Name = "IALOMITA" },
                new County { Id = 23, Code = "IS", Name = "IASI" },
                new County { Id = 24, Code = "IF", Name = "ILFOV" },
                new County { Id = 25, Code = "MM", Name = "MARAMURES" },
                new County { Id = 26, Code = "MH", Name = "MEHEDINTI" },
                new County { Id = 27, Code = "B", Name = "MUNICIPIUL BUCURESTI" },
                new County { Id = 28, Code = "MS", Name = "MURES" },
                new County { Id = 29, Code = "NT", Name = "NEAMT" },
                new County { Id = 30, Code = "OT", Name = "OLT" },
                new County { Id = 31, Code = "PH", Name = "PRAHOVA" },
                new County { Id = 32, Code = "SM", Name = "SATU MARE" },
                new County { Id = 33, Code = "SJ", Name = "SALAJ" },
                new County { Id = 34, Code = "SB", Name = "SIBIU" },
                new County { Id = 35, Code = "SV", Name = "SUCEAVA" },
                new County { Id = 36, Code = "TR", Name = "TELEORMAN" },
                new County { Id = 37, Code = "TM", Name = "TIMIS" },
                new County { Id = 38, Code = "TL", Name = "TULCEA" },
                new County { Id = 39, Code = "VS", Name = "VASLUI" },
                new County { Id = 40, Code = "VL", Name = "VÂLCEA" },
                new County { Id = 41, Code = "VN", Name = "VRANCEA" }
                );
        }

        private static void DataCleanUp(this OngContext context)
        {
            context.Database.ExecuteSqlCommand("delete from OptionsToQuestions");
            context.Database.ExecuteSqlCommand("delete from Questions");
            context.Database.ExecuteSqlCommand("delete from Sectiune");
            context.Database.ExecuteSqlCommand("delete from VersiuneFormular");
           // context.Database.ExecuteSqlCommand("delete from County");
        }

        private static void SeedOptiuni(this OngContext context)
        {
            if (context.Optiune.Any())
                return;
            context.Optiune.AddRange(
                new Optiune { IdOptiune = 1, TextOptiune = "Da", },
                new Optiune { IdOptiune = 2, TextOptiune = "Nu", },
                new Optiune { IdOptiune = 3, TextOptiune = "Nu stiu", },
                new Optiune { IdOptiune = 4, TextOptiune = "Dark Island", },
                new Optiune { IdOptiune = 5, TextOptiune = "London Pride", },
                new Optiune { IdOptiune = 6, TextOptiune = "Zaganu", },
                new Optiune { IdOptiune = 7, TextOptiune = "Transmisia manualã", },
                new Optiune { IdOptiune = 8, TextOptiune = "Transmisia automatã", },
                new Optiune { IdOptiune = 9, TextOptiune = "Altele (specificaţi)", SeIntroduceText = true },
                new Optiune { IdOptiune = 10, TextOptiune = "Metrou" },
                new Optiune { IdOptiune = 11, TextOptiune = "Tramvai" },
                new Optiune { IdOptiune = 12, TextOptiune = "Autobuz" }
            );

            context.SaveChanges();
        }

        private static void SeedSectiune(this OngContext context)
        {
            if (context.Sectiune.Any())
                return;

            context.Sectiune.AddRange(
                new Sectiune { IdSectiune = 1, CodSectiune = "B", Descriere = "Despre Bere" },
                new Sectiune { IdSectiune = 2, CodSectiune = "C", Descriere = "Descriere masini" }
                );

            context.SaveChanges();
        }

        private static void SeedQuestions(this OngContext context, char idFormular)
        {
            if (context.Intrebare.Any(a => a.FormCode == idFormular.ToString()))
                return;

            context.Intrebare.AddRange(
                // primul formular
                new Question
                {
                    Id = idFormular * 20 + 1,
                    FormCode = idFormular.ToString(),
                    IdSection = 1, //B
                    QuestionType = TipIntrebareEnum.OSinguraOptiune,
                    Text = $"{idFormular}: Iti place berea? (se alege o singura optiune selectabila)",
                    OptionsToQuestions = new List<RaspunsDisponibil>
                    {
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 1, IdOptiune = 1},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 2, IdOptiune = 2, RaspunsCuFlag = true},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 3, IdOptiune = 3}
                    }
                },
                 new Question
                 {
                     Id = idFormular * 20 + 2,
                                    FormCode = idFormular.ToString(),
                                    IdSection = 1, //B
                                    QuestionType = TipIntrebareEnum.OptiuniMultiple,
                                    Text = $"{idFormular}: Ce tipuri de bere iti plac? (se pot alege optiuni multiple)",
                                    OptionsToQuestions = new List<RaspunsDisponibil>
                    {
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 4, IdOptiune = 4, RaspunsCuFlag = true},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 5, IdOptiune = 5},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 6, IdOptiune = 6}
                    }
                 },
                 new Question
                 {
                     Id = idFormular * 20 + 3,
                     FormCode = idFormular.ToString(),
                     IdSection = 2, //C
                     QuestionType = TipIntrebareEnum.OSinguraOptiuneCuText,
                     Text = $"{idFormular}: Ce tip de transmisie are masina ta? (se poate alege O singura optiune selectabila + text pe O singura optiune)",
                     OptionsToQuestions = new List<RaspunsDisponibil>
                    {
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 7, IdOptiune = 7, RaspunsCuFlag = true},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 8, IdOptiune = 8},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 9, IdOptiune = 9}
                    }
                 },
                 new Question
                 {
                     Id = idFormular * 20 + 4,
                     FormCode = idFormular.ToString(),
                     IdSection = 2, //C
                     QuestionType = TipIntrebareEnum.OptiuniMultipleCuText,
                     Text = $"{idFormular}: Ce mijloace de transport folosesti sa ajungi la birou? (se pot alege mai multe optiuni + text pe O singura optiune)",
                     OptionsToQuestions = new List<RaspunsDisponibil>
                    {
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 10, IdOptiune = 10, RaspunsCuFlag = true},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 11, IdOptiune = 11},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 12, IdOptiune = 12},
                        new RaspunsDisponibil {IdRaspunsDisponibil = idFormular * 20 + 13, IdOptiune = 9}
                    }
                 }
                );

            context.SaveChanges();

        }

        private static void SeedVersions(this OngContext context)
        {
            if (context.VersiuneFormular.Any())
                return;

            context.VersiuneFormular.AddRange(
                 new VersiuneFormular { CodFormular = "A", VersiuneaCurenta = 1 },
                 new VersiuneFormular { CodFormular = "B", VersiuneaCurenta = 1 },
                 new VersiuneFormular { CodFormular = "C", VersiuneaCurenta = 1 }
             );

            context.SaveChanges();
        }

        //private static void SeedAnswers(this OngContext context)
        //{
        //    if(contex)
        //}

        private static bool AllMigrationsApplied(this DbContext context)
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

        
    }
}
