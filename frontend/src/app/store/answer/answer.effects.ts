import { AnswerExtra, AnswerExtraConstructorData } from '../../models/answer.extra.model';
import { LoadNotesAction } from '../note/note.actions';
import { shouldLoadPage } from '../../shared/pagination.service';
import { AnswerState } from './answer.reducer';
import { AppState } from '../store.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../../core/apiService/api.service';
import { CompletedQuestion } from '../../models/completed.question.model';
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
import { HttpParams } from '@angular/common/http';
import { AnswerFilters } from 'app/models/answer.filters.model';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AnswerThread } from '../../models/answer.thread.model';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class AnswerEffects {
  private baseUrl: string;
  state: AnswerState;
  constructor(private http: ApiService, private actions: Actions, store: Store<AppState>) {
    this.baseUrl = environment.apiUrl;
    store.select(s => s.answer).subscribe(s => this.state = s);
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
        params: this.buildLoadAnswerPreviewFilterParams(action.payload)
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

  private buildLoadAnswerPreviewFilterParams(payload: { page: number; pageSize: number; urgent: boolean; refresh: boolean; answerFilters?: AnswerFilters; }): HttpParams {
    let params = new HttpParams();

    if (payload && payload.answerFilters) {
      params = _.isNil(payload.page) ? params : params.append('page', payload.page.toString());
      params = _.isNil(payload.pageSize) ? params : params.append('pageSize', payload.pageSize.toString());
      params = _.isNil(payload.answerFilters.county) ? params : params.append('county', payload.answerFilters.county);
      params = _.isNil(payload.answerFilters.pollingStationNumber) ? params : params.append('pollingStationNumber', payload.answerFilters.pollingStationNumber);
      params = _.isNil(payload.urgent) ? params : params.append('urgent', payload.urgent.toString());
    }

    return params;
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
      const formAnswears: string = Location.joinWithSlash(this.baseUrl, '/api/v1/raspunsuri/RaspunsuriFormular');

      return this.http.get<AnswerExtraConstructorData>(formAnswears, {
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
