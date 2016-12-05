import { BaseQuestion } from '../../../models/base.question.model';
import { CompletedQuestion } from '../../../models/completed.question.model';
import { Form } from '../../../models/form.model';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

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

  answersForQuestion(question: BaseQuestion) {
    return _.find(this.completedQuestions, value => value.idIntrebare === question.idIntrebare);
  }

  constructor() { }


  ngOnInit() {

  }

}
