import { LabelValueModel } from '../../../models/labelValue.model';
import { LoadStatisticAction } from '../../../store/statistics/statistics.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.module';
import { StatisticsStateItem } from '../../../store/statistics/statistics.state';
import { ApiService } from '../../../core/apiService/api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.scss']
})
export class StatisticsDetailsComponent implements OnInit, OnDestroy {

  state: StatisticsStateItem;

  subs: Subscription[];

  retry() {
    this.store.dispatch(new LoadStatisticAction(this.state.key, this.state.page, this.state.pageSize, true));
  }

  pageChanged(event) {
    this.store.dispatch(new LoadStatisticAction(this.state.key, event.page, event.pageSize));
  }

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = [this.route.params
      .map(p => p['key'])
      .mergeMap(key => this.store.select(s => s.statistics).map(s => s[key]))
      .subscribe(s => this.state = s)]

  }
  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }
}
