import { Question } from '../../models/question.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorical-question',
  templateUrl: './categorical-question.component.html',
  styleUrls: ['./categorical-question.component.scss']
})
export class CategoricalQuestionComponent implements OnInit {

  @Input() definition: Question;

  @Input() values: any;



  constructor() { }

  ngOnInit() {
  }

}
