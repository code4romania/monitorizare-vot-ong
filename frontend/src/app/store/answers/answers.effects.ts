import { Router } from '@angular/router';
import { ANSWERS_DETAIL_LOAD, ANSWERS_DETAIL_LOADED, ANSWERS_LIST_LOAD, ANSWERS_LIST_LOADED } from './answers.actions';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ApiService } from '../../core/apiService/api.service';
import { Injectable } from '@angular/core';

import { routerActions } from '@ngrx/router-store'
@Injectable()
export class AnswersEffects {
    constructor(private http: ApiService, private actions: Actions, private router:Router) {
        
    }

    // @Effect({dispatch: false})
    // loadAnswerDetails = this.actions
    //     .ofType(routerActions.UPDATE_LOCATION)
    //     .filter(action => {
    //         return action.payload.path.startsWith('/raspunsuri/');
    //     })
    //     .flatMap(action => this.router.routerState.root.params)
    //     .do((params) => {
    //         debugger;
    //     })
    //     .filter(params => !!params['idObservator'] && !!params['idSectie'])
    //     .do(params => {
    //         debugger;
    //     });

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
    loadAnswerList = this.actions
        .ofType(routerActions.UPDATE_LOCATION)
        .filter(action => {
            return action.payload.path.startsWith('/raspunsuri')
        })
        .map(action => action.payload.path.startsWith('/raspunsuri/urgente') ? true : false)
        .map(urgent => {
            return {
                type: ANSWERS_LIST_LOAD,
                payload: { urgent: urgent }
            }
        })


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