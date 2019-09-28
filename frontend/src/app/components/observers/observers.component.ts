import {ObserversStateItem} from '../../store/observers/observers.state';
import {AppState} from '../../store/store.module';
import {Store} from '@ngrx/store';
import {ApiService} from '../../core/apiService/api.service';
import {Subscription} from 'rxjs/Rx';
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {StatisticsStateItem} from '../../store/statistics/statistics.state';
import {LoadObserversAction} from '../../store/observers/observers.actions';
import {values} from 'lodash';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss']
})
export class ObserversComponent implements OnInit, OnDestroy {

  observersState: ObserversStateItem[];
  observersSubscription: Subscription;

  anyObservers = false;

  constructor(private http: ApiService, private store: Store<AppState>) {
  }


  canShowItem(item: ObserversStateItem) {
    return item && !item.error && !item.loading && item.values && item.values.length;
  }

  ngOnInit() {
    this.loadObservers();
    this.handleObserversData();
  }

  private loadObservers() {
    this.store
      .select(s => s.observers)
      .take(1)
      .map(data => values(data))
      .concatMap(s => Observable.from(s))
      .map((storeItem: StatisticsStateItem) => new LoadObserversAction(storeItem.key, 1, 5, true))
      .subscribe(action => this.store.dispatch(action));
  }

  private handleObserversData() {
    this.observersSubscription = this.store
      .select(state => state.observers)
      .map(state => _.values(state))
      .map(s => s.filter(v => !v.error && !v.loading))
      .subscribe(s => {
        this.observersState = s;
        this.anyObservers = s.length > 0
      })
  }

  ngOnDestroy() {
    this.observersSubscription.unsubscribe();
  }

}
