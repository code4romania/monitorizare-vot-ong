using Microsoft.EntityFrameworkCore;
using MonitorizareVot.Domain.Ong.Models;
using MonitorizareVot.Ong.Api.Common;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
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
            const int page = 2;
            const int pageSize = 5;
            const bool urgent = false;

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiResponse<ApiListResponse<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
        }

        [Theory]
        [InlineData(-1, 5, false)]
        [InlineData(1, -2, true)]
        [InlineData(-1, -2, true)]
        [InlineData(0, 0, false)]
        [InlineData(10, Constants.MAX_TAKE + 1, true)]
        public async void GetRaspunsuri_ArgumenteInvalide_ReturneazaBadRequest(int page, int pageSize, bool urgent)
        {
            // ARRANGE
            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            string content = await response.Content.ReadAsStringAsync();
            Assert.NotNull(content);
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

            using (var context = new OngContext(_raspunsuriFixture.ContextOptions))
            {
                countObservatori = await context.Raspuns
                 .Where(x => x.IdObservatorNavigation.IdOng == idONG && x.IdRaspunsDisponibilNavigation.RaspunsCuFlag == urgent)
                 .Select(y =>
                   new { y.IdObservator, Observator = y.IdObservatorNavigation.NumeIntreg, IdSectie = y.IdSectieDeVotare, Sectie = y.IdSectieDeVotareNavigation.DenumireUat, y.DataUltimeiModificari }
                  )
                 .Distinct()
                 .CountAsync();
            }

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiResponse<ApiListResponse<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.NotNull(model.Data.Data);
            Assert.True(pageSize >= model.Data.Data.Count);
            Assert.Equal(page, model.Data.Page);
            Assert.Equal(pageSize, model.Data.PageSize);
            Assert.Equal(countObservatori, model.Data.Total);
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

            using (var context = new OngContext(_raspunsuriFixture.ContextOptions))
            {
                var sectiiCuObservatori = await context.Raspuns
                  .Where(x => x.IdObservatorNavigation.IdOng == idONG && x.IdRaspunsDisponibilNavigation.RaspunsCuFlag == urgent)
                  .Select(y =>
                    new { y.IdObservator, Observator = y.IdObservatorNavigation.NumeIntreg, IdSectie = y.IdSectieDeVotare, Sectie = y.IdSectieDeVotareNavigation.DenumireUat, y.DataUltimeiModificari }
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
            var model = JsonConvert.DeserializeObject<ApiResponse<ListaRaspunsuri<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.NotNull(model.Data.Raspunsuri);
            var firstModel = model.Data.Raspunsuri.First();
            var lastModel = model.Data.Raspunsuri.Last();
            Assert.Equal(first.IdObservator, firstModel.IdObservator);
            Assert.Equal(first.IdSectie, firstModel.IdSectie);
            Assert.Equal(last.IdObservator, firstModel.IdObservator);
            Assert.Equal(last.IdObservator, firstModel.IdObservator);
        }

        [Fact(Skip = "Actualizat testul atunci cand IdOng este luat din token")]
        public async void GetRaspunsuri_OngNuExista_ReturneazaEmptyList()
        {
            // ARRANGE
            const int page = 2;
            const int pageSize = 5;
            const bool urgent = false;
            const int idOng = -1;

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiResponse<ApiListResponse<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(page, model.Data.Page);
            Assert.Equal(pageSize, model.Data.PageSize);
            Assert.Equal(0, model.Data.Total);
        }

        [Fact(Skip = "Actualizat testul atunci cand IdOng este luat din token")]
        public async void GetRaspunsuri_OngNuAreRaspunsuriMarcateCuFlag_ReturneazaEmptyList()
        {
            // ARRANGE
            const int page = 2;
            const int pageSize = 5;
            const bool urgent = false;
            const int idOng = -1;

            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<ApiResponse<ApiListResponse<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(page, model.Data.Page);
            Assert.Equal(pageSize, model.Data.PageSize);
            Assert.Equal(0, model.Data.Total);
        }
    }
}
