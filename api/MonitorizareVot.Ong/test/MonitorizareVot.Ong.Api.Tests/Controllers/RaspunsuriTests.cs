using MonitorizareVot.Ong.Api.Common;
using MonitorizareVot.Ong.Api.Extensions;
using MonitorizareVot.Ong.Api.ViewModels;
using Newtonsoft.Json;
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
            var model = JsonConvert.DeserializeObject<Raspuns<ListaRaspunsuri<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
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
        [InlineData(1, 50, true, 0)]
        [InlineData(2, 50, false, 9)]
        [InlineData(1, 5, false, 9)]
        [InlineData(1, 50, false, 9)]
        public async void GetRaspunsuri_GetSectiiCuObservatori_ReturneazaRaspunsPaginat(int page, int pageSize, bool urgent, int expectedTotal)
        {
            // ARRANGE
            // ACT
            var response = await _client.GetAsync($"api/v1/raspunsuri?page={page}&pagesize={pageSize}&urgent={urgent}");

            // ASSERT
            response.EnsureSuccessStatusCode();
            var model = JsonConvert.DeserializeObject<Raspuns<ListaRaspunsuri<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.NotNull(model.Data.Data);
            Assert.True(pageSize >= model.Data.Data.Count);
            Assert.Equal(page, model.Data.Page);
            Assert.Equal(pageSize, model.Data.PageSize);
            Assert.Equal(expectedTotal, model.Data.Total);
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
            var model = JsonConvert.DeserializeObject<Raspuns<ListaRaspunsuri<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
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
            var model = JsonConvert.DeserializeObject<Raspuns<ListaRaspunsuri<RaspunsModel>>>(await response.Content.ReadAsStringAsync());
            Assert.NotNull(model);
            Assert.NotNull(model.Data);
            Assert.Equal(page, model.Data.Page);
            Assert.Equal(pageSize, model.Data.PageSize);
            Assert.Equal(0, model.Data.Total);
        }
    }
}
