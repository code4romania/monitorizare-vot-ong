import { ApiService } from '../../core/apiService/api.service';
import { ANSWERS_DETAIL_LOAD, ANSWERS_DETAIL_LOADED, ANSWERS_LIST_LOAD, ANSWERS_LIST_LOADED } from './answers.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class AnswersEffects {
    constructor(private http: ApiService, private actions: Actions) {        
    }

    
    @Effect()
    loadAnswerDetails = this.actions
        .ofType(ANSWERS_DETAIL_LOAD)
        .flatMap((action) => {
            return this.http.get('/api/v1/raspunsuri/RaspunsuriCompletate',{
                body: {
                    idObservator: action.payload.observerId,
                    idSectie: action.payload.sectionId
                }
            }).map(res => res.json().data);
        }).map((data => {
            return {
                type: ANSWERS_DETAIL_LOADED,
                payload: data
            }
        }))


    @Effect()
    answersList = this.actions
        .ofType(ANSWERS_LIST_LOAD)
        .switchMap((action) => {
            return this.http.get('/api/v1/raspunsuri', {
                body: {
                    urgent: action.payload.urgent,
                    page: action.payload.page,
                    pageSize: action.payload.pageSize
                }
            }).map((res) => res.json())
        })
        .map(answersList => {
            return {
                type: ANSWERS_LIST_LOADED,
                payload: answersList
            };
        });




}