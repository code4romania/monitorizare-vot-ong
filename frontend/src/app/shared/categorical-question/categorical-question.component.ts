import { FormQuestion } from '../../models/form.question.model';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorical-question',
  templateUrl: './categorical-question.component.html',
  styleUrls: ['./categorical-question.component.scss']
})
export class CategoricalQuestionComponent implements OnInit {

  @Input() question: FormQuestion;

  @Input('questionAnswers')
  set inputQuestionAnswers(value) {
    this.questionAnswers = value;
  };

  questionAnswers: any;
  isMultiple = false;

  hasTextarea(question: FormQuestion) {
    return question.idTipIntrebare === 2 || question.idTipIntrebare === 3;
  }
  isSingle(question: FormQuestion) {
    return question.idTipIntrebare === 0 || question.idTipIntrebare === 4;
  }




  constructor() { }

  ngOnInit() {

  }

}
