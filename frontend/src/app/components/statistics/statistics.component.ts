import { StatisticsStateItem } from '../../store/statistics/statistics.state';
import { LoadStatisticAction } from '../../store/statistics/statistics.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { LabelValueModel } from '../../models/labelValue.model';
import { ApiService } from '../../core/apiService/api.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  statisticsState: StatisticsStateItem[];
  sub: Subscription;

  anyStatistics = false;

  constructor(private http: ApiService, private store: Store<AppState>) { }


  canShowItem(item: StatisticsStateItem){
    return item && !item.error && !item.loading && item.values && item.values.length;
  }

  ngOnInit() {
      this.sub = this.store
        .select(state => state.statistics)
        .map(state => _.values(state))
        .map(s => s.filter(v => !v.error && !v.loading))
        .subscribe(s=> {
          this.statisticsState = s;
          this.anyStatistics = !!s.length
        })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
