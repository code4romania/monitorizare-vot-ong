import { AnswerThread } from '../../../models/answer.thread.model';
import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  @Input()
  answerState: AnswerState;

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  reload: EventEmitter<{}> = new EventEmitter();

  ngOnInit() {
  }

  retry() {
    this.reload.emit();
  }

  get answers() {
    let start = this.answerState.page * this.answerState.pageSize,
      end = start + this.answerState.pageSize
    return this.answerState.threads.slice(start, end);
  }
}

