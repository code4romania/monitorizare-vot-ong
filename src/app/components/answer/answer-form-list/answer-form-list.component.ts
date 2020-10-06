import { Note } from '../../../models/note.model';
import { BaseQuestion } from '../../../models/base.question.model';
import { CompletedQuestion } from '../../../models/completed.question.model';
import { Component, Input } from '@angular/core';
import { find } from 'lodash';
import { Form } from '../../../models/form.model';

@Component({
  selector: 'app-answer-form-list',
  templateUrl: './answer-form-list.component.html',
  styleUrls: ['./answer-form-list.component.scss'],
})
export class AnswerFormListComponent {
  @Input()
  form: Form;

  @Input()
  completedQuestions: CompletedQuestion[];

  @Input()
  notes: Note[];

  answersForQuestion(question: BaseQuestion) {
    return find(this.completedQuestions, (value) => value.id === question.id);
  }
  notesForQuestion(question: BaseQuestion) {
    if (!this.notes || !this.notes.length) {
      return undefined;
    }
    return this.notes.filter((note) => note.questionId === question.id);
  }

  constructor() {}
}
