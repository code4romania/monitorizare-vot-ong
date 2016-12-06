import { StatisticsService } from '../../shared/statistics.service';
import { ApiService } from '../../core/apiService/api.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topData : Observable<any>;

  constructor(private http: ApiService, private statService: StatisticsService) { }

  listConfig = this.statService.topLists;

  ngOnInit() {
    this.topData = Observable.from(_.values(this.listConfig))
      .map(config => {
        return {
          key: config.key,
          data: this.statService.get(config.method).map(json => json.data)
        }
      }).reduce((acc, current) => acc.concat(current),[])
  }

}
