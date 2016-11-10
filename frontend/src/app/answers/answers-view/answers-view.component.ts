import { Observable } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { environment } from '../../../environments/environment';
import { Paginator, PaginatorFactory } from '../../shared/paginator/paginator.service';
import { Answer } from '../shared/answer.model';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-answers-view',
  templateUrl: './answers-view.component.html',
  styleUrls: ['./answers-view.component.scss']
})
export class AnswersViewComponent implements OnInit {

  answers: Observable<Answer>;
  isUrgent: boolean;

  paginator: Paginator;

  constructor(private http: Http, route: ActivatedRoute, paginatorFactory: PaginatorFactory) {
    this.isUrgent = route.snapshot.data['urgent'] || false;
    this.paginator = paginatorFactory.create();
  }

  ngOnInit() {
    let requestOptions = {
      body: Object.assign({
        urgent: this.isUrgent
      }, this.paginator.requestData())
    }
    
    this.answers = <Observable<Answer>> this.http.get(`/api/raspunsuri`, requestOptions)
      .map(res => res.json())
      .map(json => json.data)
      .do(this.paginator.updatePagination)
      
  }

}



