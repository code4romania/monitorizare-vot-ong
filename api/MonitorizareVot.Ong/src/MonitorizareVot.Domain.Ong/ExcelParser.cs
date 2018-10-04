using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MonitorizareVot.Domain.Ong.Models;
using Microsoft.EntityFrameworkCore;
using ExcelDataReader;
using System.IO;
using System.Collections.Generic;

namespace MonitorizareVot.Domain.Ong
{
    public class OptiuneExcel
    {
        public bool HasFlag { get; set; }
        public bool SeIntroduceText { get; set; }
        public string Text { get; set; }
    }
    public class IntrebareExcel
    {
        public bool HasFlag { get; set; }
        public string IdSectiune { get; set; }
        public string CodFormular { get; set; }
        public string CodIntrebare { get; set; }
        public string TextIntrebare { get; set; }
        public string IdTipIntrebare { get; set; }
        public List<OptiuneExcel> Optiuni { get; set; }

    }

    public class ExcelParser
    {
        public static List<IntrebareExcel> GetIntrebariObservatorFromFile(string filePath = "MV Sambata.xlsx")
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var intrebariExcel = new List<IntrebareExcel>();
            var optiuni = new List<OptiuneExcel>();
            
          
            using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    do
                    {
                        var index = 0;
                        while (reader.Read())
                        {
                            index++;

                            var textIntrebare = reader.GetString(3)?.Trim();

                            if (textIntrebare != null && textIntrebare != String.Empty && textIntrebare != "TextIntrebare")
                            {


                                var intrebareExcel = new IntrebareExcel()
                                {
                                    HasFlag = reader.GetString(0) == "flag",
                                    CodFormular = reader.GetString(1)?.Trim(),
                                    IdSectiune = reader.GetString(1)?.Trim(),
                                    CodIntrebare = reader.GetString(2)?.Trim(),
                                    TextIntrebare = reader.GetString(3)?.Trim(),
                                    IdTipIntrebare = reader.GetString(4)?.Trim(),
                                    Optiuni = new List<OptiuneExcel>()
                                };

                             
                          
                                // Caz special pentru intrebari de tip number & text
                                if(intrebareExcel.IdTipIntrebare == "number" || intrebareExcel.IdTipIntrebare == "text"){

                                    intrebareExcel.Optiuni.Add(new OptiuneExcel() { Text = "input", HasFlag = false, SeIntroduceText=true });

                                } else {

                                    var indexOptiune = 5;

                                    while (indexOptiune < reader.FieldCount)
                                    {
                                        var optiune = reader.GetType() != typeof(String) ? reader.GetValue(indexOptiune)?.ToString() : reader.GetString(indexOptiune);
                                        if (optiune != null && optiune != string.Empty && optiune != "input")
                                        {
                                           
                                            intrebareExcel.Optiuni.Add(new OptiuneExcel() {
                                                Text = optiune.Trim().Split(new string[] { "$" }, StringSplitOptions.None)[0],
                                                HasFlag = optiune.Contains("$flag"),
                                                SeIntroduceText = optiune.Contains("$text") });
                                        }

                                        indexOptiune++;
                                    }
                                }

                              
                                intrebariExcel.Add(intrebareExcel);
                                optiuni.AddRange(intrebareExcel.Optiuni);

                            }
                        }
                    } while (reader.NextResult());


                    return intrebariExcel;
                }
            }
        }
    }
}
