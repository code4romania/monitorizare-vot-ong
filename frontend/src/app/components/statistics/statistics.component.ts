import { StatisticsStateItem } from '../../store/statistics/statistics.state';
import { LoadStatisticAction } from '../../store/statistics/statistics.actions';
import { AppState } from '../../store/store.module';
import { Store } from '@ngrx/store';
import { LabelValueModel } from '../../models/labelValue.model';
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

  statisticsState: Observable<StatisticsStateItem[]>;

  constructor(private http: ApiService, private store: Store<AppState>) { }


  ngOnInit() {
    this.store.select(state => state.statistics).take(1).subscribe(state => {
      _.each(state, stateItem => this.store.dispatch(new LoadStatisticAction(stateItem.key, 1, 5, true)))
    })

    this.statisticsState = this.store.select(state => state.statistics).map(state => _.values(state));
  }

}
