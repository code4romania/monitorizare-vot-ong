import { Paginator } from '../../shared/paginator/paginator.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Answer } from '../shared/answer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answers-view',
  templateUrl: './answers-view.component.html',
  styleUrls: ['./answers-view.component.scss']
})
export class AnswersViewComponent implements OnInit {

  answers: Answer[] = undefined;
  currentPage: number = 0;
  pageSize: number = 10;
  isValid: boolean = true;

  private routeSnapshot: ActivatedRouteSnapshot

  constructor(private http: Http, route: ActivatedRoute, private paginator: Paginator) {
    this.routeSnapshot = route.snapshot;
  }

  ngOnInit() {
    this.http.get(`${environment.API_URL}/raspunsuri`, {
      body: {
        page: this.currentPage,
        pageSize: this.pageSize,
        urgent: this.routeSnapshot.data['urgent'] || false
      }
    }).map(res => res.json())
      .map(this.paginator.updatePagination)
      .subscribe(data => {
        let answersData = data.data;
        this.isValid = data.esteValid;
        this.answers = answersData.data;
      })

  }



}
