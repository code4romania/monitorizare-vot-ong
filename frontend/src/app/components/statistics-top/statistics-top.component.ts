import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../core/apiService/api.service';
import { StatisticsService } from '../../shared/statistics.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  templateUrl: './statistics-top.component.html',
  styleUrls: ['./statistics-top.component.scss']
})
export class StatisticsTopComponent implements OnInit {

  topObservables: Observable<any>[] = [];

  constructor(private http: ApiService, private statService: StatisticsService) { }

  public topListsArray = undefined;

  public topStats = [];

  ngOnInit() {

    this.topListsArray = _.values(this.statService.topLists);
    _.each(this.topListsArray, (config, index) => {
      this.topStats[index] = { stats: undefined };
      this.statService.get(config.method).map(json => json.data).subscribe(data => this.topStats[index].stats = data);
    })
  }
}
