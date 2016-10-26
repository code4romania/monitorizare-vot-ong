import { Answer } from '../shared/answer.model';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-answers-view',
  templateUrl: './answers-view.component.html',
  styleUrls: ['./answers-view.component.scss']
})
export class AnswersViewComponent implements OnInit {

  answers: Answer[] = _.range(1, 10).map(value => { return { id: value, section: `Section ${value}` } });
  
  constructor() { }

  ngOnInit() {
  }

}
