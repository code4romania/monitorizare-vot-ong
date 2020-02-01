
import {mergeMap, map} from 'rxjs/operators';
import { LabelValueModel } from '../../../models/labelValue.model';
import { LoadStatisticAction } from '../../../store/statistics/statistics.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.module';
import { StatisticsStateItem } from '../../../store/statistics/statistics.state';
import { ApiService } from '../../../core/apiService/api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.scss']
})
export class StatisticsDetailsComponent implements OnInit, OnDestroy {

  state: StatisticsStateItem;

  subs: Subscription[];

  currentValues() {
    let startPage = this.state.page - 1,
      pageSize = this.state.pageSize,
      startIndex = startPage * pageSize,
      endIndex = startIndex + pageSize

    return this.state.values.slice(startIndex, endIndex)
  }
  rowIndex(index, listIndex) {
    let offset = (this.state.page - 1) * this.state.pageSize;
    if (listIndex === 0) {
      return offset + index + 1;
    }

    return offset + (this.currentValues().length / 2) * listIndex + index + 1;
  }

  splitList() {
    let list = this.currentValues();
    return [
      list.slice(0, list.length / 2),
      list.slice(list.length / 2, list.length)
    ]
  }

  retry() {
    this.store.dispatch(new LoadStatisticAction(this.state.key, this.state.page, this.state.pageSize, true));
  }

  pageChanged(event) {
    this.store.dispatch(new LoadStatisticAction(this.state.key, event.page, event.pageSize));
  }

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = [this.route.params.pipe(
      map(p => p['key']),
      mergeMap(key => this.store.select(s => s.statistics).pipe(map(s => s[key]))),)
      .subscribe(s => this.state = s)]

  }
  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }
}
