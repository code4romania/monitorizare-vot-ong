import { AnswerPreview } from '../../models/answer-preview.model';
import { AnswersService } from '../../services/answers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
@Component({
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  answers: (AnswerPreview[])[] = [];

  answersSubscription: Subscription;

  isUrgent = false;
  currentPage = 1;
  pageSize = 20;
  totalAnswers = 0;

  loading = false;
  error = false;

  constructor(private answersService: AnswersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.map(data => <boolean>data["urgent"])
      .subscribe(urgent => {
        this.isUrgent = urgent;
        this.getAnswers(this.currentPage, this.isUrgent);
      });
  }

  pageChanged(event) {
    this.currentPage = event.page;
    let pageLoaded = !!this.answers[this.currentPage];

    if (!pageLoaded) {
      this.getAnswers(this.currentPage, this.isUrgent);
    }
  }

  getAnswers(pageIndex: number, isUrgent: boolean) {
    this.loading = true;
    this.error = false;
    if (this.answersSubscription) {
      this.answersSubscription.unsubscribe();
    }

    this.answersSubscription = this.answersService.getAll(isUrgent, {
      pageSize: this.pageSize,
      page: pageIndex
    })
      .subscribe(json => {

        // TODO UPDATE PAGINATION
        this.currentPage = json.page;
        this.totalAnswers = json.total;

        this.answers[this.currentPage] = json.data;


        this.loading = false;
      }, () => {
        this.loading = false;
        this.error = true;
      });
  }
}



