import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from '../../store/answer/answer.actions';
import { AnswerState } from '../../store/answer/answer.reducer';
import { FormState } from '../../store/form/form.reducer';
import { AppState } from '../../store/store.module';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  answerState: Observable<AnswerState>;
  formState: Observable<FormState>;

  countyCode: string;
  pollingStationNumber: string;
  observerId: number;
  isUrgent: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.formState = this.store.select(state => state.form).pipe(distinctUntilChanged());
    this.answerState = this.store.select(state => state.answer).pipe(distinctUntilChanged());

    this.answerState.subscribe(value => {
      this.isUrgent = value.urgent || false;
      this.countyCode = value.answerFilters.county;
      this.pollingStationNumber = value.answerFilters.pollingStationNumber;
      this.observerId = value.answerFilters.observerId;
    });
  }

  requestFilteredData() {

    this.store.dispatch(new LoadAnswerPreviewAction(this.isUrgent, 1, 5, true, {
      observerId: this.observerId,
      pollingStationNumber: this.pollingStationNumber,
      county: this.countyCode
    }));

  }

  redoAnswerListAction() {
    // take the current state of the answerState, and do a reloaded
    this.store.select(state => state.answer).pipe(take(1),
      map(s => new LoadAnswerPreviewAction(s.urgent, s.page, s.pageSize, true, s.answerFilters)),
      map(a => this.store.dispatch(a)))
        .subscribe();
  }

  redoAnswerDetailsAction() {
    // take the current state of the answerState, and do a reloaded
    this.store.select(state => state.answer).pipe(take(1),
      map(s => new LoadAnswerDetailsAction(s.observerId, s.sectionId)),
      map(a => this.store.dispatch(a)))
        .subscribe();
  }

  pageChanged(event) {
    this.store.select(s => s.answer).pipe(take(1),
      map(s => new LoadAnswerPreviewAction(s.urgent, event.page, event.pageSize, false, s.answerFilters)),
      map(a => this.store.dispatch(a)))
        .subscribe();
  }

}
