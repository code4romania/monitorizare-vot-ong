import { AnswerExtra } from '../../../models/answer.extra.model';
import { Component, Input, OnInit } from '@angular/core';
@Component({
    selector: 'app-answer-extra-questions',
    templateUrl: './answer-extra-questions.component.html',
    styleUrls: ['./answer-extra-questions.component.scss']
})
export class AnswerExtraQuestionsComponent implements OnInit{

    @Input()
    answerExtra: AnswerExtra;
    ngOnInit(){

    }
}
