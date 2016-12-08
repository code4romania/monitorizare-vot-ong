import { environment } from '../../../../environments/environment';
import { Note } from '../../../models/note.model';
import { BaseAnswer } from '../../../models/base.answer.model';
import { CompletedAnswer } from '../../../models/completed.answer.model';
import { FormQuestion } from '../../../models/form.question.model';

import * as _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorical-question',
  templateUrl: './categorical-question.component.html',
  styleUrls: ['./categorical-question.component.scss']
})
export class CategoricalQuestionComponent implements OnInit {

  @Input() question: FormQuestion;

  @Input('completedAnswers') set inputCompletedAnswers(value: CompletedAnswer[]) {
    if (value && value.length) {
      if(this.isSingle && value && value.length > 1 && !environment.production){
        try{
          console.log(`Multiple answers on question with id ${this.question.idIntrebare}`)
        } catch(ex){}
      }
      this.completedAnswers = _.keyBy(value, value => value.idOptiune)
    } else {
      this.completedAnswers = undefined;
    }
  }  
  completedAnswers: _.Dictionary<CompletedAnswer> = {};

  @Input()
  note: Note

  get isFlagged(){
    return _.some(_.values(this.completedAnswers),a => a.raspunsCuFlag);
  }

  get isTextQuestion() {
    return this.question.idTipIntrebare === 2 || this.question.idTipIntrebare === 3
  }
  get isSingle() {
    return this.question.idTipIntrebare === 0 || this.question.idTipIntrebare === 4;
  }

  isChecked(answer: BaseAnswer) {
    return this.completedAnswers && this.completedAnswers[answer.idOptiune];
  }
  isTextAnswer(answer: BaseAnswer) {
    return this.isTextQuestion && answer.seIntroduceText;
  }

  isFlaggedAnswer(answer: BaseAnswer){
    return _.some(_.values(this.completedAnswers),a => a.raspunsCuFlag && a.idOptiune === answer.idOptiune);
  }

  answerTextValue(answer: BaseAnswer) {
    return this.completedAnswers && this.completedAnswers[answer.idOptiune] && this.completedAnswers[answer.idOptiune].value;
  }




  constructor() { }

  ngOnInit() {

  }

}
