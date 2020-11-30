export interface StatisticsStateConfig {
    key: string;
    method: string;
    header: string;
    subHeader: string;
}
export let statisticsConfig = [{
    key: 'numar-observatori',
    method: 'observerNumber',
    header: 'Topul judetelor',
    subHeader: 'cu cei mai multi observatori',
}, {
    //   key: 'sesizari',
    //   method: "sesizari",
    //   header: "Topul sectiilor",
    //   subHeader: "cu cele mai multe sesizari"
    // }, {
    key: 'sesizari-judete',
    method: 'countiesIrregularities',
    header: 'Topul judetelor',
    subHeader: 'cu cele mai multe sesizari'
}, {
    key: 'sesizari-sectii',
    method: 'pollingStationIrregularities',
    header: 'Topul sectiilor',
    subHeader: 'cu cele mai multe sesizari'
}, {
    key: 'sesizari-deschidere-judete',
    method: 'countiesOpeningIrregularities',
    header: 'Topul judetelor',
    subHeader: 'cu cele mai multe sesizari la deschidere'
}, {
    key: 'sesizari-deschidere-sectii',
    method: 'pollingStationOpeningIrregularities',
    header: 'Topul sectiilor',
    subHeader: 'cu cele mai multe sesizari la deschidere'
}, {
    key: 'sesizari-numarare-judete',
    method: 'countiesByCountingIrregularities',
    header: 'Topul judetelor',
    subHeader: 'cu cele mai multe sesizari la numararea voturilor'
}, {
    key: 'sesizari-numarare-sectii',
    method: 'pollingStationsByCountingIrregularities',
    header: 'Topul sectiilor',
    subHeader: 'cu cele mai multe sesizari la numararea voturilor'
}];
