
import {mergeMap, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.module';
import { StatisticsStateItem } from '../../../store/statistics/statistics.state';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.scss']
})
export class StatisticsDetailsComponent implements OnInit, OnDestroy {
  state: StatisticsStateItem;
  subs: Subscription[];

  @Input() item: StatisticsStateItem;

  constructor(private store: Store<AppState>, public activeModal: NgbActiveModal) { }


  ngOnInit() {
      this.subs = [ this.store.select(s => s.statistics).pipe(map(s =>s[this.item.key]))
       .subscribe(s => this.state = s)];

   }
   ngOnDestroy() {
     this.subs.map(sub => sub.unsubscribe());
   }
}
