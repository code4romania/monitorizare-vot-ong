import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  @Input("answers")
  state: AnswerState;

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  get answers() {
    let start = this.state.page * this.state.pageSize,
      end = start + this.state.pageSize
    return this.state.threads.slice(start, end);
  }
}



