import { AnswersDetailsState, AnswersListState } from '../../store/answers/answers.state';
import { AppState } from '../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

@Component({
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit, OnDestroy {

    answersListState: Observable<AnswersListState>;
    answersDetailState: Observable<AnswersDetailsState>;

    urgent = false;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.answersListState =
            this.store.select((state) => state.answers.answersList).distinctUntilChanged();
        this.answersDetailState =
            this.store.select((state) => state.answers.answersDetails).distinctUntilChanged();
    }
    ngOnDestroy() {
    }

    //     this.store.dispatch({
    //         type: ANSWERS_DETAIL_LOAD,
    //         payload: {
    //             observerId: params.idObservator,
    //             sectionId: params.idSectie
    //         }
    //     })
    // });



}
