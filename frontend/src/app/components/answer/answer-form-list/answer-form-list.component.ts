import {Note} from '../../../models/note.model';
import {BaseQuestion} from '../../../models/base.question.model';
import {CompletedQuestion} from '../../../models/completed.question.model';
import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {FormDetails} from '../../../models/form.info.model';
import {Form} from '../../../models/form.model';

@Component({
  selector: 'app-answer-form-list',
  templateUrl: './answer-form-list.component.html',
  styleUrls: ['./answer-form-list.component.scss']
})
export class AnswerFormListComponent implements OnInit {

  @Input()
  form: Form;

  @Input()
  completedQuestions: CompletedQuestion[];

  @Input()
  notes: Note[];

  answersForQuestion(question: BaseQuestion) {
    return _.find(this.completedQuestions, value => value.id === question.id);
  }
  notesForQuestion(question: BaseQuestion) {
    if (!this.notes || !this.notes.length) {
      return undefined;
    }
    return this.notes.filter(note => note.questionId === question.id);
  }

  constructor() { }

  ngOnInit() {

  }

}
