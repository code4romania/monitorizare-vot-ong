import { AnswersListState } from '../../store/answers/answers.state';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  @Input("answers")
  state: AnswersListState;

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {


  }

  get answers() {
    let pagination = this.state.pagination;
    return this.state.items.slice(pagination.currentPage * pagination.itemsPerPage, pagination.currentPage * pagination.itemsPerPage + pagination.itemsPerPage);
  }
}



