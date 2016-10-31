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

  answers: Answer[] = [];
  isUrgent: boolean;

  paginator: Paginator;

  constructor(private http: Http, route: ActivatedRoute, paginatorFactory: PaginatorFactory) {
    this.isUrgent = route.snapshot.data['urgent'] || false;
    this.paginator = paginatorFactory.create();
  }

  ngOnInit() {
    this.http.get(`${environment.API_URL}/raspunsuri`, {
      body: {
        pagination: this.paginator.requestData(),
        urgent: this.isUrgent
      }
    }).map(res => res.json())
      .map(json => json.data)
      .map(this.paginator.updatePagination)
      .subscribe(data => {
        console.log(`Got data`);
        console.log(data);
        this.answers = data.raspunsuri;

        // just for debugging purposes
        if(this.isUrgent){
          this.answers.splice(-1,1);
        }
      })

  }



}
