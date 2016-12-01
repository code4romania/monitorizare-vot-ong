import { AnswersService } from '../../shared/answers.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Answer } from '../../models/answer.model';
@Component({
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss']
})
export class AnswersListComponent implements OnInit {

  answers: Observable<Answer[]>;

  constructor(private answersService: AnswersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.map(data => <boolean>data["urgent"])
    .subscribe(this.getAnswers.bind(this));
  }

  getAnswers(isUrgent:boolean) {
   this.answers = this.answersService.getAll(isUrgent);
  }
}



