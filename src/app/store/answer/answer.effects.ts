import { of as observableOf} from 'rxjs';

import { catchError, map, switchMap, filter } from 'rxjs/operators';
import {
  AnswerExtra,
  AnswerExtraConstructorData,
} from '../../models/answer.extra.model';
import { LoadNotesAction } from '../note/note.actions';
import { shouldLoadPage } from '../../shared/pagination.service';
import { AnswerState } from './answer.reducer';
import { AppState } from '../store.module';
import { Store } from '@ngrx/store';
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
  LoadAnswerPreviewErorrAction,
} from './answer.actions';
import { HttpParams } from '@angular/common/http';
import { AnswerFilters } from '../../models/answer.filters.model';
import { isNil } from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnswerThread } from '../../models/answer.thread.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class AnswerEffects {
  private baseUrl: string;
  state: AnswerState;
  constructor(
    private http: ApiService,
    private actions: Actions,
    store: Store<AppState>
  ) {
    this.baseUrl = environment.apiUrl;
    store.select((s) => s.answer).subscribe((s) => (this.state = s));
  }

  @Effect()
  loadThreads = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_PREVIEW),
    filter((a: LoadAnswerPreviewAction) =>
      shouldLoadPage(
        a.payload.page,
        a.payload.pageSize,
        this.state.threads.length
      )
    ),
    switchMap((action: LoadAnswerPreviewAction) => {
      const answearsUrl: string = Location.joinWithSlash(
        this.baseUrl,
        '/api/v1/answers'
      );

      return this.http.get<{
        data: AnswerThread[];
        totalItems: number;
        totalPages: number;
      }>(answearsUrl, {
        params: this.buildLoadAnswerPreviewFilterParams(action.payload),
      });
    }),
    map(
      (json) =>
        new LoadAnswerPreviewDoneAction(
          json.data,
          json.totalItems,
          json.totalPages
        )
    ),
    catchError(() => observableOf(new LoadAnswerPreviewErorrAction()))
  );

  shouldLoad(page: number, pageSize: number, arrayLen) {
    if (page === undefined || pageSize === undefined) {
      return true;
    }

    return page * pageSize > arrayLen;
  }

  private buildLoadAnswerPreviewFilterParams(payload: {
    page: number;
    pageSize: number;
    urgent: boolean;
    refresh: boolean;
    answerFilters?: AnswerFilters;
  }): HttpParams {
    let params = new HttpParams();

    if (payload && payload.answerFilters) {
      params = isNil(payload.page)
        ? params
        : params.append('page', payload.page.toString());
      params = isNil(payload.pageSize)
        ? params
        : params.append('pageSize', payload.pageSize.toString());
      params = isNil(payload.answerFilters.county)
        ? params
        : params.append('county', payload.answerFilters.county);
      params = isNil(payload.answerFilters.pollingStationNumber)
        ? params
        : params.append(
            'pollingStationNumber',
            payload.answerFilters.pollingStationNumber
          );
      params = isNil(payload.urgent)
        ? params
        : params.append('urgent', payload.urgent.toString());
    }

    return params;
  }

  @Effect()
  loadDetails = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_DETAILS),
    switchMap((action: LoadAnswerDetailsAction) => {
      const completedAnswears: string = Location.joinWithSlash(
        this.baseUrl,
        '/api/v1/answers/filledIn'
      );

      return this.http.get<CompletedQuestion[]>(completedAnswears, {
        body: {
          idPollingStation: action.payload.sectionId,
          idObserver: action.payload.observerId,
        },
      });
    }),
    map(
      (answers: CompletedQuestion[]) => new LoadAnswerDetailsDoneAction(answers)
    ),
    catchError(() => observableOf(new LoadAnswerDetailsErrorAction()))
  );

  @Effect()
  loadNotes = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_DETAILS),
    map(
      (a: LoadAnswerDetailsAction) =>
        new LoadNotesAction(a.payload.sectionId, a.payload.observerId)
    )
  );

  @Effect()
  loadExtraFromAnswer = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_DETAILS),
    map(
      (a: LoadAnswerDetailsAction) =>
        new LoadAnswerExtraAction(a.payload.observerId, a.payload.sectionId)
    )
  );

  @Effect()
  loadExtra = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_EXTRA),
    map((a: LoadAnswerExtraAction) => a.payload),
    switchMap((p) => {
      const formAnswears: string = Location.joinWithSlash(
        this.baseUrl,
        '/api/v1/answers/pollingStationInfo'
      );

      return this.http.get<AnswerExtraConstructorData>(formAnswears, {
        body: {
          ObserverId: p.observerId,
          PollingStationNumber: p.sectionId,
        },
      });
    }),
    map((json) => (json ? new AnswerExtra(json) : undefined)),
    map((extra) => new LoadAnswerExtraDoneAction(extra)),
    catchError(() => observableOf(new LoadAnswerExtraErrorAction()))
  );
}
