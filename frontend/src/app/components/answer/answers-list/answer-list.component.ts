import { AnswerThread } from '../../../models/answer.thread.model';
import { AnswerState } from '../../../store/answer/answer.reducer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  @Input('answerState')
  state: AnswerState;

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  reload: EventEmitter<{}> = new EventEmitter();

  ngOnInit() {
  }

  retry() {
    this.reload.emit();
  }
  answerLinkPrefix(){
    return this.state.urgent ? '/raspunsuri/urgente/detalii' : '/raspunsuri/detalii'
  }
  get answers() {
    let start = this.state.page * this.state.pageSize,
      end = start + this.state.pageSize
    return this.state.threads.slice(start, end);
  }

  answerList(){
    let startPage = this.state.page - 1,
      pageSize = this.state.pageSize,
      startIndex = startPage * pageSize,
      endIndex = startIndex + pageSize

    return this.state.threads.slice(startIndex, endIndex)
  }

  pageChangedEvent(event){
    this.pageChanged.emit(event)
  }
}

