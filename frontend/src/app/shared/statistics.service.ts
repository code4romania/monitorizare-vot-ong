import { Observable } from 'rxjs/Rx';
import { ApiService } from '../core/apiService/api.service';
import { PaginationData } from './pagination.interface';
import { Injectable } from '@angular/core';
import * as _ from "lodash";

export interface StatsConfig {
  key: string
  method: string
  header?:string
  subHeader?:string
}

@Injectable()
export class StatisticsService {

  constructor(private http: ApiService) {}

  public get topLists() {
    return  <{string:StatsConfig}>Object.assign(this._topLists);
  }

  private _topLists = _.keyBy([
    {
      key: 'numar-observatori',
      method: "numarObservatori",
      header: 'Topul judetelor',
      subHeader: "cu cele mai multe sesizari",
    }, {
    //   key: 'sesizari',
    //   method: "sesizari",
    //   header: "Topul sectiilor",
    //   subHeader: "cu cele mai multe sesizari"
    // }, {
      key: 'sesizari-judete',
      method: "sesizariJudete",
      header: "Topul judetelor",
      subHeader: "cu cele mai multe nereguli la deschiderea sectiei de votare"
    }, {
      key: 'sesizari-sectii',
      method: "sesizariSectii",
      header: "Topul judetelor",
      subHeader: "cu cele mai multe nereguli la numararea voturilor"
    }, {
      key: 'sesizari-deschidere-judete',
      method: "sesizariDeschidereJudete",
      header: "Topul judetelor",
      subHeader: "cu cei mai multi observatori"
    }, {
      key: 'sesizari-deschidere-sectii',
      method: "sesizariDeschidereSectii",
      header: "Topul judetelor",
      subHeader: "cu cele mai multe sesizari"
    }, {
      key: 'sesizari-numarare-judete',
      method: "sesizariNumarareJudete",
      header: "Topul judetelor",
      subHeader: "cu cele mai multe sesizari"
    }, {
      key: 'sesizari-numarare-sectii',
      method: "sesizariNumarareSectii",
      header: "Topul judetelor",
      subHeader: "cu cele mai multe sesizari"
    }
  ], value => value.key);

  get(method: string, page = 1, pageSize = 5){
    return this.http.get(`/api/v1/statistici/${method}`,{
      body: {
        page,
        pageSize
      }
    }).map(res => res.json())
  }

}
