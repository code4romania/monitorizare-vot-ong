import {ObserversStateItem} from '../../store/observers/observers.state';
import {AppState} from '../../store/store.module';
import {Store} from '@ngrx/store';
import {ApiService} from '../../core/apiService/api.service';
import {Subscription} from 'rxjs/Rx';
import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss']
})
export class ObserversComponent implements OnInit, OnDestroy {

  observersState: ObserversStateItem[];
  sub: Subscription;

  anyObservers = false;

  constructor(private http: ApiService, private store: Store<AppState>) {
  }


  canShowItem(item: ObserversStateItem) {
    return item && !item.error && !item.loading && item.values && item.values.length;
  }

  ngOnInit() {
    this.loadObservers();
  }

  private loadObservers() {
    this.sub = this.store
      .select(state => state.observers)
      .map(state => _.values(state))
      .map(s => s.filter(v => !v.error && !v.loading))
      .subscribe(s => {
        this.observersState = s;
        this.anyObservers = s.length > 0
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
