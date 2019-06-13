using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MonitorizareVot.Domain.Ong.ValueObjects;
using OfficeOpenXml;

namespace MonitorizareVot.Ong.Api.Services
{
    public class XlsxFileLoader : IFileLoader
    {
        private static readonly string[] Suffixes = {".xlsx", ".xls"};
        public async Task<List<PollingStationDTO>> importFileAsync(IFormFile file)
        {
            if(file == null || file.Length <= 0)
                throw new System.ArgumentException();
            
            List<PollingStationDTO> resultList = new List<PollingStationDTO>();

            using(var memoryStream = new MemoryStream())
            {
                CancellationTokenSource source = new CancellationTokenSource();
                CancellationToken cancellationToken = source.Token;

                await file.CopyToAsync(memoryStream, cancellationToken);

                using(var excelPackage = new ExcelPackage(memoryStream))
                {
                    ExcelWorksheet workSheet = excelPackage.Workbook.Worksheets[0];
                    for(int index = 2; index < workSheet.Dimension.Rows; ++index)
                    {
                        if(workSheet.Cells[index, 5].Text.Length == 0)
                            continue;

                        PollingStationDTO dto = new PollingStationDTO();
                        dto.Adresa = workSheet.Cells[index, 7].Text;
                        dto.CodJudet = workSheet.Cells[index, 1].Text;
                        Int32.TryParse(workSheet.Cells[index, 3].Text, out int codValue);
                        Int32.TryParse(workSheet.Cells[index, 5].Text, out int nrSectieValue);
                        dto.CodSiruta = codValue;
                        dto.NrSV = nrSectieValue;
                        resultList.Add(dto);
                    }
                }
            }
            
            return resultList;
        }

        public bool validateFile(IFormFile file)
        {
            foreach(string Suffix in Suffixes)
            {
                if(Path.GetExtension(file.FileName).EndsWith(Suffix, StringComparison.OrdinalIgnoreCase))
                    return true;
            }
                
            return false;
        }
    }
}