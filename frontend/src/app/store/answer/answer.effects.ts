import { AnswerExtra, AnswerExtraConstructorData } from '../../models/answer.extra.model';
import { LoadNotesAction } from '../note/note.actions';
import { shouldLoadPage } from '../../shared/pagination.service';
import { AnswerState } from './answer.reducer';
import { AppState } from '../store.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../core/apiService/api.service';
import { CompletedQuestion } from '../../models/completed.question.model';
import { Location } from '@angular/common';

import {
    AnswerActionTypes,
    LoadAnswerDetailsAction,
    LoadAnswerDetailsDoneAction,
    LoadAnswerDetailsErrorAction,
    LoadAnswerExtraAction,
    LoadAnswerExtraDoneAction,
    LoadAnswerExtraErrorAction,
    LoadAnswerPreviewAction,
    LoadAnswerPreviewDoneAction,
    LoadAnswerPreviewErorrAction
} from './answer.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AnswerThread } from '../../models/answer.thread.model';
import { environment } from 'environments/environment';

@Injectable()
export class AnswerEffects {
    private baseUrl: string;
    state: AnswerState;
    constructor(private http: ApiService, private actions: Actions, store: Store<AppState>) {
        this.baseUrl = environment.apiUrl;
        store.select(s => s.answer).subscribe(s => this.state = s)
    }

    @Effect()
    loadThreads = this.actions
        .ofType(AnswerActionTypes.LOAD_PREVIEW)
        .filter((a: LoadAnswerPreviewAction) => shouldLoadPage(a.payload.page, a.payload.pageSize, this.state.threads.length))
        .switchMap((action: LoadAnswerPreviewAction) => {
            const answearsUrl: string = Location.joinWithSlash(this.baseUrl, '/api/v1/raspunsuri');

            return this.http.get<{
                data: AnswerThread[],
                totalItems: number,
                totalPages: number
            }>(answearsUrl, {
                body: {
                    page: action.payload.page,
                    pageSize: action.payload.pageSize,
                    observerId: action.payload.answerFilters.observerId,
                    county: action.payload.answerFilters.county,
                    pollingStationNumber: action.payload.answerFilters.pollingStationNumber,
                    urgent: action.payload.urgent
                }
            })
        })
        .map(json => new LoadAnswerPreviewDoneAction(json.data, json.totalItems, json.totalPages))
        .catch(() => Observable.of(new LoadAnswerPreviewErorrAction()));


    shouldLoad(page: number, pageSize: number, arrayLen) {
        if (page === undefined || pageSize === undefined) {
            return true;
        }

        return page * pageSize > arrayLen;
    }

    @Effect()
    loadDetails = this.actions
        .ofType(AnswerActionTypes.LOAD_DETAILS)
        .switchMap((action: LoadAnswerDetailsAction) => {
            const completedAnswears: string = Location.joinWithSlash(this.baseUrl, '/api/v1/raspunsuri/RaspunsuriCompletate');

            return this.http.get<CompletedQuestion[]>(completedAnswears, {
                body: {
                    idSectieDeVotare: action.payload.sectionId,
                    idObservator: action.payload.observerId
                }
            });
        }
        )
        .map((answers: CompletedQuestion[]) => new LoadAnswerDetailsDoneAction(answers))
        .catch(() => Observable.of(new LoadAnswerDetailsErrorAction()));

    @Effect()
    loadNotes = this.actions
        .ofType(AnswerActionTypes.LOAD_DETAILS)
        .map((a: LoadAnswerDetailsAction) => new LoadNotesAction(a.payload.sectionId, a.payload.observerId));

    @Effect()
    loadExtraFromAnswer = this.actions
        .ofType(AnswerActionTypes.LOAD_DETAILS)
        .map((a: LoadAnswerDetailsAction) => new LoadAnswerExtraAction(a.payload.observerId, a.payload.sectionId));

    @Effect()
    loadExtra = this.actions
        .ofType(AnswerActionTypes.LOAD_EXTRA)
        .map((a: LoadAnswerExtraAction) => a.payload)
        .switchMap(p => {
            const formsAnswears: string = Location.joinWithSlash(this.baseUrl, '/api/v1/raspunsuri/RaspunsuriFormular');

            return this.http.get<AnswerExtraConstructorData>(formsAnswears, {
                body: {
                    idObservator: p.observerId,
                    idSectieDeVotare: p.sectionId
                }
            });
        }
        )
        .map(json => json ? new AnswerExtra(json) : undefined)
        .map(extra => new LoadAnswerExtraDoneAction(extra))
        .catch(() => Observable.of(new LoadAnswerExtraErrorAction()));


}
