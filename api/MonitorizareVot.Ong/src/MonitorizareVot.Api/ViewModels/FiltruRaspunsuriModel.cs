namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class FiltruRaspunsuriSectiiModel : PagingModel
    {
        public bool Urgent { get; set; }
        public string County { get; set; }
        public int PollingStationNumber { get; set; }
        public int ObserverId { get; set; }
    }
}