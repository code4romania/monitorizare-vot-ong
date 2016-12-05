import { ApiService } from '../../core/apiService/api.service';
import { AnswerActionTypes, LoadAnswerPreviewAction, LoadAnswerPreviewDoneAction } from './answer.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
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
}