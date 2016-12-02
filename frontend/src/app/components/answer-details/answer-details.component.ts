import { AnswersDetailsState } from '../../store/answers/answers.state';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector:'app-answer-details',
  templateUrl: './answer-details.component.html',
  styleUrls: ['./answer-details.component.scss']
})
export class AnswerDetailsComponent implements OnInit {


  // @Input()
  // forms: Form[];
  @Input()
  answers: AnswersDetailsState;


  constructor() { }

  ngOnInit() {
  }
}
