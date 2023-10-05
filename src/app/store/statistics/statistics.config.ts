export interface StatisticsStateConfig {
  key: string;
  method: string;
  header: string;
}
export let statisticsConfig = [
  {
    key: 'numar-observatori',
    method: 'observerNumber',
    header: 'Top municipalities by number of observers.',
  },
  {
    key: 'sesizari-judete',
    method: 'countiesIrregularities',
    header: 'Top municipalities by filled-in forms with a flagged answer (all forms)',
  },
  {
    key: 'sesizari-sectii',
    method: 'pollingStationIrregularities',
    header: 'Top polling stations by filled-in forms with a flagged answer (all forms)',
  },
  {
    key: 'sesizari-deschidere-judete',
    method: 'countiesOpeningIrregularities',
    header: 'Top municipalities by filled-in forms with a flagged answer and form code = "A" (opening)',
  },
  {
    key: 'sesizari-deschidere-sectii',
    method: 'pollingStationOpeningIrregularities',
    header: 'Top polling stations by filled-in forms with a flagged answer and form code = "A" (opening)',
  },
  {
    key: 'sesizari-numarare-judete',
    method: 'countiesByCountingIrregularities',
    header: 'Top municipalities by filled-in forms with a flagged answer checked and form code = "C" (closing)',
  },
  {
    key: 'sesizari-numarare-sectii',
    method: 'pollingStationsByCountingIrregularities',
    header: 'Top polling stations by filled-in forms with a flagged answer checked and form code = "C" (closing)',
  },
];
