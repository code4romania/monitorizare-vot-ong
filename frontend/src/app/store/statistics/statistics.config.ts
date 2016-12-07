export interface StatisticsStateConfig {
    key: string
    method: string
    header: string
    subHeader: string
}
export let statisticsConfig = [{
    key: 'numar-observatori',
    method: "numarObservatori",
    header: 'Topul judetelor',
    subHeader: "cu cei mai multi observatori",
}, {
    //   key: 'sesizari',
    //   method: "sesizari",
    //   header: "Topul sectiilor",
    //   subHeader: "cu cele mai multe sesizari"
    // }, {
    key: 'sesizari-judete',
    method: "sesizariJudete",
    header: "Topul judetelor",
    subHeader: "cu cele mai sesizari"
}, {
    key: 'sesizari-sectii',
    method: "sesizariSectii",
    header: "Topul sectiilor",
    subHeader: "cu cele mai multe sesizari"
}, {
    key: 'sesizari-deschidere-judete',
    method: "sesizariDeschidereJudete",
    header: "Topul judetelor",
    subHeader: "cu cele mai multe sesizari la deschidere"
}, {
    key: 'sesizari-deschidere-sectii',
    method: "sesizariDeschidereSectii",
    header: "Topul sectiilor",
    subHeader: "cu cele mai multe sesizari la deschidere"
}, {
    key: 'sesizari-numarare-judete',
    method: "sesizariNumarareJudete",
    header: "Topul judetelor",
    subHeader: "cu cele mai multe sesizari la numararea voturilor"
}, {
    key: 'sesizari-numarare-sectii',
    method: "sesizariNumarareSectii",
    header: "Topul sectiilor",
    subHeader: "cu cele mai multe sesizari la numararea voturilor"
}];