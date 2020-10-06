import { environment } from 'src/environments/environment';
import { Note } from '../../../models/note.model';
import { BaseAnswer } from '../../../models/base.answer.model';
import { CompletedAnswer } from '../../../models/completed.answer.model';
import { FormQuestion } from '../../../models/form.question.model';

import { keyBy, reject, some, values, Dictionary } from 'lodash';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorical-question',
  templateUrl: './categorical-question.component.html',
  styleUrls: ['./categorical-question.component.scss'],
})
export class CategoricalQuestionComponent implements OnInit {
  @Input() question: FormQuestion;

  @Input('completedAnswers')
  set inputCompletedAnswers(value: CompletedAnswer[]) {
    if (value && value.length) {
      if (!environment.production) {
        this.validateSingleQuestion(value);
        this.validateTextQuestion(value);
      }
      this.completedAnswers = keyBy(value, (v) => v.idOption);
    } else {
      this.completedAnswers = undefined;
    }
  }
  completedAnswers: Dictionary<CompletedAnswer> = {};

  @Input()
  notes: Note[];

  showNotes = false;

  constructor() {}

  ngOnInit() {}

  validateSingleQuestion(answers: CompletedAnswer[]) {
    try {
      if (this.isSingle && answers && answers.length > 1) {
        console.log(`Multiple answers on question with id ${this.question.id}`);
      }
    } catch (ex) {}
  }
  validateTextQuestion(answers: CompletedAnswer[]) {
    try {
      if (
        this.isTextQuestion &&
        answers &&
        reject(answers, (a) => a.isFreeText || !!a.value).length > 1
      ) {
        console.log(
          `Multiple text answers on question with id ${this.question.id}`
        );
      }
    } catch (ex) {}
  }
  get hasNotes() {
    return this.notes && this.notes.length;
  }
  get isFlagged() {
    return some(values(this.completedAnswers), (a) => a.flagged);
  }

  get isTextQuestion() {
    return this.question.questionType === 2 || this.question.questionType === 3;
  }
  get isSingle() {
    return this.question.questionType === 0 || this.question.questionType === 4;
  }

  isChecked(answer: BaseAnswer) {
    return this.completedAnswers && this.completedAnswers[answer.idOption];
  }
  isTextAnswer(answer: BaseAnswer) {
    return this.isTextQuestion && answer.isFreeText;
  }

  isFlaggedAnswer(answer: BaseAnswer) {
    return some(
      values(this.completedAnswers),
      (a) => a.flagged && a.idOption === answer.idOption
    );
  }

  answerTextValue(answer: BaseAnswer) {
    return (
      this.completedAnswers &&
      this.completedAnswers[answer.idOption] &&
      this.completedAnswers[answer.idOption].value
    );
  }
}
