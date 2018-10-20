using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Common;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Newtonsoft.Json;
using System.Linq;
using System.Net.Http;
using Xunit;

namespace MonitorizareVot.Ong.Api.Tests.Controllers
{
    public class RaspunsuriTests : IClassFixture<RaspunsuriFixture>
    {
        private readonly HttpClient _client;
        private readonly RaspunsuriFixture _raspunsuriFixture;

        public RaspunsuriTests(RaspunsuriFixture raspunsuriFixture)
        {
            _raspunsuriFixture = raspunsuriFixture;
            _client = raspunsuriFixture.Client;
        }

        [Fact]
        public async void GetRaspunsuri_GetSectiiCuObservatori_ReturneazaOK()
        {
            // ARRANGE
            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(Constants.DEFAULT_PAGE_SIZE, model.Data.Count());
            Assert.Equal(1, model.Page);
            Assert.Equal(Constants.DEFAULT_PAGE_SIZE, model.PageSize);
        }

        [Theory]
        [InlineData(-1, 5, false)]
        [InlineData(1, -2, true)]
        [InlineData(-1, -2, true)]
        [InlineData(0, 0, false)]
        public async void GetRaspunsuri_ArgumenteInvalide_ReturneazaOK(int page, int pageSize, bool urgent)
        {
            // ARRANGE
            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(1, model.Page);
            Assert.Equal(Constants.DEFAULT_PAGE_SIZE, model.PageSize);
        }

        [Theory]
        [InlineData(1, 50, true)]
        [InlineData(2, 50, false)]
        [InlineData(1, 5, false)]
        [InlineData(1, 50, false)]
        public async void GetRaspunsuri_GetSectiiCuObservatori_ReturneazaRaspunsPaginat(int page, int pageSize, bool urgent)
        {
            // ARRANGE
            const int idONG = 1; // TODO set the idONG in token and use it as a param for the test
            int countObservatori;

            using (var context = new VoteMonitorContext(_raspunsuriFixture.ContextOptions))
            {
                countObservatori = await context.Answers
                 .Where(x => x.Observer.IdNgo == idONG && x.OptionAnswered.Flagged == urgent)
                 .Select(y =>
                   new { IdObservator = y.IdObserver, Observator = y.Observer.Name, IdSectie = y.IdPollingStation, Sectie = y.PollingStation.AdministrativeTerritoryCode, DataUltimeiModificari = y.LastModified }
                  )
                 .Distinct()
                 .CountAsync();
            }

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.True(pageSize >= model.Data.Count);
            Assert.Equal(page, model.Page);
            Assert.Equal(pageSize, model.PageSize);
            Assert.Equal(countObservatori, model.TotalPages);
        }

        [Theory]
        [InlineData(2, 5, false)]
        [InlineData(1, 50, false)]
        [InlineData(2, 10, true)]
        [InlineData(1, 10, true)]
        public async void GetRaspunsuri_GetSectiiCuObservatori_ReturneazaRaspunsuriOrdonateDupaDataModificareDesc(int page, int pageSize, bool urgent)
        {
            // ARRANGE
            const int idONG = 1; // TODO set the idONG in token and use it as a param for the test
            RaspunsModel first, last;

            using (var context = new VoteMonitorContext(_raspunsuriFixture.ContextOptions))
            {
                var sectiiCuObservatori = await context.Answers
                  .Where(x => x.Observer.IdNgo == idONG && x.OptionAnswered.Flagged == urgent)
                  .Select(y =>
                    new { IdObservator = y.IdObserver, Observator = y.Observer.Name, IdSectie = y.IdPollingStation, Sectie = y.PollingStation.AdministrativeTerritoryCode, DataUltimeiModificari = y.LastModified }
                   )
                  .Distinct()
                  .OrderByDescending(x => x.DataUltimeiModificari)
                  .Skip((page - 1) * pageSize)
                  .Take(pageSize)
                  .ToListAsync();
                var sectieFirst = sectiiCuObservatori.First();
                var sectieLast = sectiiCuObservatori.Last();
                first = new RaspunsModel { IdObservator = sectieFirst.IdObservator, IdSectie = sectieFirst.IdSectie };
                last = new RaspunsModel { IdObservator = sectieFirst.IdObservator, IdSectie = sectieLast.IdSectie };
            }

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            var firstModel = model.Data.First();
            var lastModel = model.Data.Last();
            Assert.Equal(first.IdObservator, firstModel.IdObservator);
            Assert.Equal(first.IdSectie, firstModel.IdSectie);
            Assert.Equal(last.IdObservator, firstModel.IdObservator);
            Assert.Equal(last.IdObservator, firstModel.IdObservator);
        }

        [Fact(Skip = "Actualizat testul atunci cand IdNgo este luat din token")]
        public async void GetRaspunsuri_OngNuExista_ReturneazaEmptyList()
        {
            // ARRANGE
            const int page = 2;
            const int pageSize = 5;
            const bool urgent = false;

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(page, model.Page);
            Assert.Equal(pageSize, model.PageSize);
            Assert.Equal(0, model.TotalPages);
        }

        [Fact(Skip = "Actualizat testul atunci cand IdNgo este luat din token")]
        public async void GetRaspunsuri_OngNuAreRaspunsuriMarcateCuFlag_ReturneazaEmptyList()
        {
            // ARRANGE
            const int page = 2;
            const int pageSize = 5;
            const bool urgent = false;

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiListResponse<RaspunsModel>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(page, model.Page);
            Assert.Equal(pageSize, model.PageSize);
            Assert.Equal(0, model.TotalPages);
        }
    }
}
