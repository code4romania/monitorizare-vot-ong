import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../core/apiService/api.service';
import { CompletedAnswer } from '../../models/completed.answer.model';
import { CompletedQuestion } from '../../models/completed.question.model';
import {
    AnswerActionTypes,
    LoadAnswerDetailsAction,
    LoadAnswerDetailsDoneAction,
    LoadAnswerPreviewAction,
    LoadAnswerPreviewDoneAction
} from './answer.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';




let mockBase = <CompletedQuestion[]>[{
    idIntrebare: 1,
    textIntrebare: "Aţi observat lipsa materialelor electorale ",
    idTipIntrebare: 1,
    codIntrebare: "B1",
    codFormular: "A",
    raspunsuri: <CompletedAnswer[]>[{
        "idOptiune": 1,
        "textOptiune": "Da",
        "seIntroduceText": false,
        raspunsCuFlag: true
    }]
}, {
    "idIntrebare": 2,
    "textIntrebare": "Daca ati observat lipsa materialelor electorale, ce materiale electorale lipsesc",
    "idTipIntrebare": 3,
    "codIntrebare": "B1.1",
    "codFormular": "A",
    "raspunsuri": <CompletedAnswer[]>[
        {
            "idOptiune": 4,
            "textOptiune": "Urne staţionare",
            "seIntroduceText": false

        }, {
            "idOptiune": 5,
            "textOptiune": "Urna mobilă",
            "seIntroduceText": false
        }, {
            "idOptiune": 14,
            "textOptiune": "Altele",
            "seIntroduceText": true,
            value: "Alte lucruri - TEST"
        }]
}, {
    "idIntrebare": 12,
    "textIntrebare": "Câţi membri are BESV ",
    "idTipIntrebare": 2,
    "codIntrebare": "C1",
    "codFormular": "A",
    "raspunsuri": <CompletedAnswer[]>[
        {
            "idOptiune": 43,
            "textOptiune": "Membri BESV",
            "seIntroduceText": true,
            value: "Valoare de test text"
        }]
}]


@Injectable()
export class AnswerEffects {
    constructor(private http: ApiService, private actions: Actions) { }

    @Effect()
    loadThreads = this.actions
        .ofType(AnswerActionTypes.LOAD_PREVIEW)
        .switchMap((action: LoadAnswerPreviewAction) => this.http.get('/api/v1/raspunsuri', {
            body: action.payload
        }).map(res => res.json())
            .map(json => new LoadAnswerPreviewDoneAction(json.data, json.totalItems, json.totalPages)));

    @Effect()
    loadDetails = this.actions
        .ofType(AnswerActionTypes.LOAD_DETAILS)
        .switchMap((action: LoadAnswerDetailsAction) => {
            return Observable.from([mockBase]);
            // return this.http.get('/api/v1/raspunsuri/RaspunsuriCompletate', {
            //     body: {
            //         idSectieDeVotare: action.payload.sectionId,
            //         idObservator: action.payload.observerId
            //     }
            // }).map(res => <CompletedQuestion[]>res.json().data)
        })
        .map((answers: CompletedQuestion[]) => new LoadAnswerDetailsDoneAction(answers))
}