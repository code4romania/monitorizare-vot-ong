
import { ANSWERS_LIST_LOAD } from '../../store/answers/answers.actions';
import { AnswersListState } from '../../store/answers/answers.state';
import { AppState } from '../../store/app.state';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  @Input("answers")
  set inputAnswers(value) {
    this.state = value;
    if(this.state.urgent) {
      this.routerLinkPrefix = '/raspunsuri/urgente';
    } else {
      this.routerLinkPrefix = '/raspunsuri';
    }
  }
  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter<any>();

  routerLinkPrefix: string;

  state: AnswersListState;

  ngOnInit() {
    
    
  }
  
  get answers() {
    let pagination = this.state.pagination;
    return this.state.items.slice(pagination.currentPage * pagination.itemsPerPage, pagination.currentPage * pagination.itemsPerPage + pagination.itemsPerPage);
  }
}



