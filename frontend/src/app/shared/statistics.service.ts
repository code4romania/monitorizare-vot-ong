import { ApiService } from '../core/apiService/api.service';
import { PaginationData } from './pagination.interface';
import { Injectable } from '@angular/core';
import * as _ from "lodash";


@Injectable()
export class StatisticsService {

  constructor(private http: ApiService) {}

  public get topLists() {
    return Object.assign(this._topLists);
  }

  private _topLists = _.keyBy([
    {
      key: 'numar-observatori',
      method: "numarObservatori",
      label: "Topul judetelor cu cele mai multe sesizari",
    }, {
      key: 'sesizari',
      method: "sesizari",
      label: "Topul sectiilor cu cele mai multe sesizari",
    }, {
      key: 'sesizari-judete',
      method: "sesizariJudete",
      label: "Topul judetelor cu cele mai multe nereguli la deschiderea sectiei de votare",
    }, {
      key: 'sesizari-sectii',
      method: "sesizariSectii",
      label: "Topul judetelor cu cele mai multe nereguli la numararea voturilor",
    }, {
      key: 'sesizari-deschidere-judete',
      method: "sesizariDeschidereJudete",
      label: "Topul judetelor cu cei mai multi observatori",
    }, {
      key: 'sesizari-deschidere-sectii',
      method: "sesizariDeschidereSectii",
      label: "Topul judetelor cu cele mai multe sesizari",
    }, {
      key: 'sesizari-numarare-judete',
      method: "sesizariNumarareJudete",
      label: "Topul judetelor cu cele mai multe sesizari",
    }, {
      key: 'sesizari-numarare-sectii',
      method: "sesizariNumarareSectii",
      label: "Topul judetelor cu cele mai multe sesizari",
    }
  ], value => value.key);

  get(method: string, paginationData?: PaginationData){
    return this.http.get(`/api/v1/statistici/${method}`,{
      body: paginationData
    }).map(res => res.json())
  }

}
