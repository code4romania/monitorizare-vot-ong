import { LoadAnswerDetailsAction } from '../../../store/answer/answer.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.module';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { Form } from '../../../models/form.model';
import { FormState } from '../../../store/form/form.reducer';
import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit, OnDestroy {



  answerState: AnswerState
  formState: FormState

  subs: Subscription[] = [];

  formAnswers(formId: string) {
    if (!this.answerState || !this.answerState.selectedAnswer) {
      return {}
    }
    return this.answerState.selectedAnswer.filter(value => value.codFormular);
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.subs = [
      this.store.select(s => s.answer).subscribe(s => this.answerState = s),
      this.store.select(s => s.form).subscribe(s => this.formState = s),

    ]
  }
  ngOnDestroy() {
    _.map(this.subs, sub => sub.unsubscribe());
  }

  retry() {
    this.store.dispatch(new LoadAnswerDetailsAction(this.answerState.observerId, this.answerState.sectionId));
  }
}
