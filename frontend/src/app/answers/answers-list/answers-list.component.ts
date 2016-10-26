import { Answer } from '../shared/answer.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit{

  constructor() { }

  @Input() answers:Answer[];

  ngOnInit() {  
  }

  

}
