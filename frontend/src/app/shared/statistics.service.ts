import { Injectable } from '@angular/core';
import * as _ from "lodash";


@Injectable()
export class StatisticsService {

  public get topLists() {
    return Object.assign(this._topLists);
  }

  private _topLists = _.keyBy([
    {
      key: 'numar-observatori',
      method: "numarObservatori",
      label: "Topul judetelor cu cele mai multe sesizari",
      dataObservable: undefined
    }, {
      key: 'sesizari',
      method: "sesizari",
      label: "Topul sectiilor cu cele mai multe sesizari",
      dataObservable: undefined
    }, {
      key: 'sesizari-judete',
      method: "sesizariJudete",
      label: "Topul judetelor cu cele mai multe nereguli la deschiderea sectiei de votare",
      dataObservable: undefined
    }, {
      key: 'sesizari-sectii',
      method: "sesizariSectii",
      label: "Topul judetelor cu cele mai multe nereguli la numararea voturilor",
      dataObservable: undefined
    }, {
      key: 'sesizari-deschidere-judete',
      method: "sesizariDeschidereJudete",
      label: "Topul judetelor cu cei mai multi observatori",
      dataObservable: undefined
    }, {
      key: 'sesizari-deschidere-sectii',
      method: "sesizariDeschidereSectii",
      label: "Topul judetelor cu cele mai multe sesizari",
      dataObservable: undefined
    }, {
      key: 'sesizari-numarare-judete',
      method: "sesizariNumarareJudete",
      label: "Topul judetelor cu cele mai multe sesizari",
      dataObservable: undefined
    }, {
      key: 'sesizari-numarare-sectii',
      method: "sesizariNumarareSectii",
      label: "Topul judetelor cu cele mai multe sesizari",
      dataObservable: undefined
    }
  ], value => value.key);

}
