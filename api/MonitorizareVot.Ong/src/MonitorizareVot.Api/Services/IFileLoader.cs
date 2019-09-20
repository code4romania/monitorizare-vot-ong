using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MonitorizareVot.Domain.Ong.ValueObjects;

namespace MonitorizareVot.Ong.Api.Services
{
    public interface IFileLoader
    {
        Task<List<PollingStationDTO>> ImportFileAsync(IFormFile file);

        bool ValidateFile(IFormFile file);
    }
}