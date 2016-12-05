import { AnswerState } from '../../store/answer/answer.reducer';
import { FormState } from '../../store/form/form.reducer';
import { AppState } from '../../store/store.module';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

@Component({
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

    answerState: Observable<AnswerState>;
    formState: Observable<FormState>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.formState = this.store.select(state => state.form).distinctUntilChanged();
        this.answerState = this.store.select(state => state.answer).distinctUntilChanged();

    }
}
