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
  stateSubscription: Subscription;
  anyStatistics = false;

  constructor(private http: ApiService, private store: Store<AppState>) { }


  ngOnInit() {
    this.stateSubscription =
      this.store
        .select(state => state.statistics)
        .map(state => _.values(state))
        .subscribe(state => {
          this.statisticsState = state.filter(value => !value.error && !value.loading)
          this.anyStatistics = !!state.filter(item => !item.error && !item.loading && item.values && item.values.length).length
        });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

}
