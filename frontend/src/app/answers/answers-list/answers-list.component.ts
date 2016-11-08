import { Answer } from '../shared/answer.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit, OnChanges{

  constructor() { }

  @Input() answers:Answer[];

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges){
  }



}
