using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MonitorizareVot.Domain.Ong.Models
{
    public partial class OngContext : DbContext
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NgoAdmin>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_AdminONG");

                entity.ToTable("AdminONG");

                entity.Property(e => e.Id)
                    .HasColumnName("IdAdminONG")
                    .ValueGeneratedNever();

                entity.Property(e => e.Account)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Ngo)
                    .WithMany(p => p.NgoAdmins)
                    .HasForeignKey(d => d.IdNgo)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_AdminONG_ONG");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Intrebare");

                entity.HasIndex(e => e.IdSection)
                    .HasName("IX_Intrebare_IdSectiune");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.FormCode)
                    .IsRequired()
                    .HasMaxLength(2);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasOne(d => d.FormSection)
                    .WithMany(p => p.Intrebare)
                    .HasForeignKey(d => d.IdSection)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<County>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Judet");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(4);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Nota");

                entity.HasIndex(e => e.IdQuestion)
                    .HasName("IX_Nota_IdIntrebare");

                entity.HasIndex(e => e.IdObserver)
                    .HasName("IX_Nota_IdObservator");

                entity.HasIndex(e => e.IdPollingStation)
                    .HasName("IX_Nota_IdSectieDeVotare");

                entity.Property(e => e.AttachementPath).HasMaxLength(1000);

                entity.Property(e => e.LastModified).HasColumnType("datetime");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.IdQuestion)
                    .HasConstraintName("FK_Nota_Intrebare");

                entity.HasOne(d => d.Observer)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.IdObserver)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.PollingStation)
                    .WithMany(p => p.Nota)
                    .HasForeignKey(d => d.IdPollingStation)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Observer>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Observator");

                entity.HasIndex(e => e.IdNgo)
                    .HasName("IX_Observator_IdOng");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DeviceRegisterDate).HasColumnType("datetime");

                entity.Property(e => e.FromTeam).HasDefaultValueSql("0");

                entity.Property(e => e.MobileDeviceId).HasColumnType("varchar(500)");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Pin)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Ngo)
                    .WithMany(p => p.Observers)
                    .HasForeignKey(d => d.IdNgo)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Ngo>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_ONG");

                entity.ToTable("ONG");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ShortName)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("NumeONG")
                    .HasMaxLength(200);

                entity.Property(e => e.Organizer).HasDefaultValueSql("0");
            });

            modelBuilder.Entity<Option>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Optiune");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.IsFreeText).HasDefaultValueSql("0");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => new { IdObservator = e.IdObserver, IdRaspunsDisponibil = e.IdOptionToQuestion, IdSectieDeVotare = e.IdPollingStation })
                    .HasName("PK_Raspuns_1");

                entity.HasIndex(e => e.IdObserver)
                    .HasName("IX_Raspuns_IdObservator");

                entity.HasIndex(e => e.IdOptionToQuestion)
                    .HasName("IX_Raspuns_IdRaspunsDisponibil");

                entity.HasIndex(e => e.IdPollingStation)
                    .HasName("IX_Raspuns_IdSectieDeVotare");

                entity.Property(e => e.LastModified)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.Value).HasMaxLength(1000);

                entity.Property(e => e.PollingStationNumber);

                entity.Property(e => e.CountyCode).HasMaxLength(2);

                entity.HasOne(d => d.Observer)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.IdObserver)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Raspuns_Observator");

                entity.HasOne(d => d.OptionAnswered)
                    .WithMany(p => p.Raspuns)
                    .HasForeignKey(d => d.IdOptionToQuestion)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.PollingStation)
                    .WithMany(p => p.Raspuns)
                    .HasForeignKey(d => d.IdPollingStation)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<RaspunsDisponibil>(entity =>
            {
                entity.HasKey(e => e.IdRaspunsDisponibil)
                    .HasName("IX_IdOptiune_IdIntrebare");

                entity.HasIndex(e => e.IdIntrebare)
                    .HasName("IX_RaspunsDisponibil_IdIntrebare");

                entity.HasIndex(e => e.IdOptiune)
                    .HasName("IX_RaspunsDisponibil_IdOptiune");

                entity.HasIndex(e => new { e.IdOptiune, e.IdIntrebare })
                    .HasName("IX_RaspunsDisponibil")
                    .IsUnique();

                entity.Property(e => e.IdRaspunsDisponibil).ValueGeneratedNever();

                entity.Property(e => e.RaspunsCuFlag).HasDefaultValueSql("0");

                entity.HasOne(d => d.IdIntrebareNavigation)
                    .WithMany(p => p.OptionsToQuestions)
                    .HasForeignKey(d => d.IdIntrebare)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_RaspunsDisponibil_Intrebare");

                entity.HasOne(d => d.IdOptionNavigation)
                    .WithMany(p => p.OptionsToQuestions)
                    .HasForeignKey(d => d.IdOptiune)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_RaspunsDisponibil_Optiune");
            });

            modelBuilder.Entity<RaspunsFormular>(entity =>
            {
                entity.HasKey(e => new { e.IdObservator, e.IdSectieDeVotare })
                    .HasName("PK_RaspunsFormular_1");

                entity.HasIndex(e => e.IdObservator)
                    .HasName("IX_RaspunsFormular_IdObservator");

                entity.HasIndex(e => e.IdSectieDeVotare)
                    .HasName("IX_RaspunsFormular_IdSectieDeVotare");

                entity.Property(e => e.DataUltimeiModificari)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("getdate()");

                entity.Property(e => e.OraPlecarii).HasColumnType("datetime");

                entity.Property(e => e.OraSosirii).HasColumnType("datetime");

                entity.Property(e => e.PresedinteBesvesteFemeie).HasColumnName("PresedinteBESVEsteFemeie");

                entity.HasOne(d => d.IdObserverNavigation)
                    .WithMany(p => p.PollingStationInfos)
                    .HasForeignKey(d => d.IdObservator)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_RaspunsFormular_Observator");

                entity.HasOne(d => d.IdSectieDeVotareNavigation)
                    .WithMany(p => p.RaspunsFormular)
                    .HasForeignKey(d => d.IdSectieDeVotare)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<SectieDeVotare>(entity =>
            {
                entity.HasKey(e => e.IdSectieDeVotarre)
                    .HasName("PK_SectieDeVotare");

                entity.HasIndex(e => e.IdJudet)
                    .HasName("IX_SectieDeVotare_IdJudet");

                entity.HasIndex(e => new { e.IdJudet, e.IdSectieDeVotarre })
                    .HasName("IX_Unique_IDJudet_NumarSectie")
                    .IsUnique();

                entity.Property(e => e.IdSectieDeVotarre).ValueGeneratedNever();

                entity.Property(e => e.AdresaSectie).HasMaxLength(500);

                entity.Property(e => e.Coordonate).HasColumnType("varchar(200)");

                entity.Property(e => e.DenumireUat).HasMaxLength(100);

                entity.Property(e => e.LocalitateComponenta)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.IdCountyNavigation)
                    .WithMany(p => p.PollingStations)
                    .HasForeignKey(d => d.IdJudet)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_SectieDeVotare_Judet");
            });

            modelBuilder.Entity<Sectiune>(entity =>
            {
                entity.HasKey(e => e.IdSectiune)
                    .HasName("PK_Sectiune");

                entity.Property(e => e.IdSectiune).ValueGeneratedNever();

                entity.Property(e => e.CodSectiune)
                    .IsRequired()
                    .HasMaxLength(4);

                entity.Property(e => e.Descriere)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<VersiuneFormular>(entity =>
            {
                entity.HasKey(e => e.CodFormular)
                    .HasName("PK_VersiuneFormular");

                entity.Property(e => e.CodFormular).HasMaxLength(2);
            });


            modelBuilder.Entity<StatisticiSimple>(entity =>
            {
                entity.HasKey(e => e.Label)
                    .HasName("PK_Statistici");
            });

            modelBuilder.Entity<StatisticiCompuse>(entity =>
            {
                entity.HasKey(e => new { e.Label, e.Cod })
                    .HasName("PK_StatisticiCompuse");
            });

            modelBuilder.Entity<StatisticiOptiuni>(entity =>
            {
                entity.HasKey(e => e.Label)
                    .HasName("PK_StatisticiOptiuni");
            });

            modelBuilder.Entity<RaspunsSectie>(entity =>
            {
                entity.HasKey(e => new { e.IdObservator, e.IdSectie })
                    .HasName("PK_RaspunsSectie");
            });
        }

        public virtual DbSet<NgoAdmin> AdminOng { get; set; }
        public virtual DbSet<Question> Intrebare { get; set; }
        public virtual DbSet<County> Judet { get; set; }
        public virtual DbSet<Note> Nota { get; set; }
        public virtual DbSet<Observer> Observator { get; set; }
        public virtual DbSet<Ngo> Ong { get; set; }
        public virtual DbSet<Option> Optiune { get; set; }
        public virtual DbSet<Answer> Raspuns { get; set; }
        public virtual DbSet<RaspunsDisponibil> RaspunsDisponibil { get; set; }
        public virtual DbSet<RaspunsFormular> RaspunsFormular { get; set; }
        public virtual DbSet<SectieDeVotare> SectieDeVotare { get; set; }
        public virtual DbSet<Sectiune> Sectiune { get; set; }
        public virtual DbSet<VersiuneFormular> VersiuneFormular { get; set; }

        // Entities used for GROUP BY results
        public virtual DbSet<StatisticiSimple> StatisticiSimple { get; set; }
        public virtual DbSet<StatisticiCompuse> StatisticiCompuse { get; set; }
        public virtual DbSet<StatisticiOptiuni> StatisticiOptiuni { get; set; }
        public virtual DbSet<RaspunsSectie> RaspunsSectie { get; set; }
    }
}