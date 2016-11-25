import { Injectable } from '@angular/core';

@Injectable()
export class StatisticsService {

  public get topLists(){
    return Object.assign(this._topLists);
  } 

  private _topLists = [{
    method: "numarObservatori",
    label: "Topul judetelor cu cele mai multe sesizari",
    dataObservable: undefined
  }, {
    method: "numarObservatori",
    label: "Topul sectiilor cu cele mai multe sesizari",
    dataObservable: undefined
  }, {
    method: "numarObservatori",
    label: "Topul judetelor cu cele mai multe nereguli la deschiderea sectiei de votare",
    dataObservable: undefined
  }, {
    method: "numarObservatori",
    label: "Topul judetelor cu cele mai multe nereguli la numararea voturilor",
    dataObservable: undefined
  }, {
    method: "numarObservatori",
    label: "Topul judetelor cu cei mai multi observatori",
    dataObservable: undefined
    // }, {
    //   method: "numarObservatori",
    //   label: "Topul judetelor cu cele mai multe sesizari",
    // dataObservable: undefined
    // }, {
    //   method: "numarObservatori",
    //   label: "Topul judetelor cu cele mai multe sesizari",
    // dataObservable: undefined
    // }, {
    //   method: "numarObservatori",
    //   label: "Topul judetelor cu cele mai multe sesizari",
    // dataObservable: undefined
  }];

}
