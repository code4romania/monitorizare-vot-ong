import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('answerState') state: AnswerState;

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  reload: EventEmitter<{}> = new EventEmitter();

  get answers() {
    const start = this.state.page * this.state.pageSize;
    const end = start + this.state.pageSize;
    return this.state.threads.slice(start, end);
  }

  ngOnInit() {
  }

  retry() {
    this.reload.emit();
  }

  answerLinkPrefix() {
    return this.state.urgent ? '/urgente/detalii' : '/raspunsuri/detalii';
  }

  answerList() {
    const startPage = this.state.page - 1;
    const pageSize = this.state.pageSize;
    const startIndex = startPage * pageSize;
    const endIndex = startIndex + pageSize;

    return this.state.threads.slice(startIndex, endIndex);
  }

  pageChangedEvent(event) {
    this.pageChanged.emit(event);
  }
}

