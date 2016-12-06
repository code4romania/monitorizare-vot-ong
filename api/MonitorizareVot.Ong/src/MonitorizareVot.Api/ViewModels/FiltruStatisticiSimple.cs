namespace MonitorizareVot.Ong.Api.ViewModels
{
    public class FiltruStatisticiSimple : PagingModel
    {
        public string Formular { get; set; }
        public TipGrupareStatistici Grupare { get; set; }
    }
}
