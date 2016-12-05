import { Observable } from 'rxjs/Rx';
import { Form } from '../../../models/form.model';
import { FormState } from '../../../store/form/form.reducer';
import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {


  @Input()
  answerState: AnswerState;

  @Input()
  formState: FormState

  formAnswers(formId: string) {
    if(!this.answerState || !this.answerState.selectedAnswer) {
      return {}
    }
    return this.answerState.selectedAnswer.filter(value => value.codFormular);
  }

  constructor() { }

  ngOnInit() {

  }
}
