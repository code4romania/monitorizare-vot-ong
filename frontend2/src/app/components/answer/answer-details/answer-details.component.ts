import { NoteState } from '../../../store/note/note.reducer';
import { LoadAnswerDetailsAction } from '../../../store/answer/answer.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.module';
import { FormState } from '../../../store/form/form.reducer';
import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CompletedQuestion } from '../../../models/completed.question.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit, OnDestroy {
  answerState: AnswerState;
  formState: FormState;
  noteState: NoteState;

  subs: Subscription[] = [];

  // exampleExtra: AnswerExtra = {
  //   dataUltimeiModificari: new Date(),
  //   esteZonaUrbana: false,
  //   oraSosirii: new Date(),
  //   oraPlecarii: new Date(),
  //   presedinteBesvesteFemeie: false
  // }

  constructor(private store: Store<AppState>) {
  }

  hasError() {
    return !this.answerState || this.answerState.selectedError;
    // || !this.noteState || this.noteState.error
    // || this.answerState.answerExtraError
  }

  isLoading() {
    return !this.answerState || !this.noteState || this.answerState.selectedLoading || this.noteState.loading;
    // || this.answerState.answerExtraLoading
  }

  formNotes(formId: string) {
    if (!this.noteState || this.noteState.loading || this.noteState.error || !this.noteState.notes.length) {
      return [];
    }
    return this.noteState.notes.filter(note => note.codFormular === formId);
  }

  formAnswers(): CompletedQuestion[] {
    if (!this.answerState || !this.answerState.selectedAnswer) {
      return [];
    }
    return this.answerState.selectedAnswer.filter(value => value.codFormular);
  }

  ngOnInit() {

    this.subs = [
      this.store.select(s => s.answer).subscribe(s => this.answerState = s),
      this.store.select(s => s.form).subscribe(s => this.formState = s),
      this.store.select(s => s.note).subscribe(s => this.noteState = s)
    ];
  }

  ngOnDestroy() {
    _.map(this.subs, sub => sub.unsubscribe());
  }

  retry() {
    this.store.dispatch(new LoadAnswerDetailsAction(this.answerState.observerId, this.answerState.sectionId));
  }
}
