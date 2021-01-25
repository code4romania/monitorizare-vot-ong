import { forkJoin, of as observableOf, of} from 'rxjs';

import { catchError, map, switchMap, filter, withLatestFrom, mergeAll, startWith } from 'rxjs/operators';
import {
  AnswerExtra,
  AnswerExtraConstructorData,
} from '../../models/answer.extra.model';
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
  RecentlyRefreshedPayload,
  setAnswersLoadingStatus,
  setThreadsRecentlyRefreshed,
  setThreadsRecentlyRefreshedTimer,
  updatePageInfo,
} from './answer.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { answer } from './answer.selectors';
import { AnswersService } from 'src/app/services/answers.service';

@Injectable()
export class AnswerEffects {
  private baseUrl: string;
  state: AnswerState;
  constructor(
    private http: ApiService,
    private actions: Actions,
    private store: Store<AppState>,
    private answerService: AnswersService,
  ) {
    this.baseUrl = environment.apiUrl;
    store.select((s) => s.answer).subscribe((s) => (this.state = s));
  }

  @Effect()
  loadThreads = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_PREVIEW),
    withLatestFrom(this.store.select(answer)),
    filter(([action, crtState]: [LoadAnswerPreviewAction, AnswerState]) =>
      !!crtState.threads === false || action.payload.refresh || crtState.threadsRecentlyRefreshed === false),
    map(([action, crtState]: [LoadAnswerPreviewAction, AnswerState]) => {
      const { payload: currentPayload } = action;
      const updatedPayload = {};

      for (const k in currentPayload) {
        updatedPayload[k] = currentPayload[k] ?? crtState[k];
      }

      return {
        ...action,
        payload: updatedPayload,
      };
    }),

    switchMap((action: LoadAnswerPreviewAction) => {
      return this.answerService.getAnswers(action.payload).pipe(
        switchMap(
          json => json.data.length
            ? forkJoin(json.data.map(a => this.answerService.fetchExtraDetailsForObserver(a.idObserver, a.idPollingStation))).pipe(
              map(extraDetailsArr => ({
                ...json,
                data: json.data.map((a, i) => ({ ...a, ...extraDetailsArr[i] }))
              }))
            )
            : of(json)
        ),
        map(
          (json) =>
            [
              new LoadAnswerPreviewDoneAction(
                json.data,
                json.totalItems,
                json.totalPages,
              ),
              setAnswersLoadingStatus({ isLoading: false }),
              setThreadsRecentlyRefreshed({recentlyRefreshed: true}),
              updatePageInfo({ page: json.page, pageSize: json.pageSize })
            ]
        ),
        mergeAll(),
        catchError(() => observableOf(new LoadAnswerPreviewErorrAction())),
        startWith(setAnswersLoadingStatus({ isLoading: true }))
      )
    }),

    // catchError(() => observableOf(new LoadAnswerPreviewErorrAction()))
  );

  @Effect()
  loadDetails = this.actions.pipe(
    ofType(AnswerActionTypes.LOAD_DETAILS),
    withLatestFrom(this.store.select(answer)),
    // filter(([, crtAnswerState]) => !!crtAnswerState.selectedAnswer === false),
    map(([action]) => action),
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

  /**
   * Timer that resets itself after a preset time
   */
  @Effect()
  threadsRecentlyRefreshedTimer = this.actions.pipe(
    ofType(setThreadsRecentlyRefreshed),
    withLatestFrom(this.store.select(answer)),
    map(([{recentlyRefreshed}, {threadsRecentlyRefreshedTimer}]: [RecentlyRefreshedPayload, AnswerState]) => {
      if (threadsRecentlyRefreshedTimer) {
        clearTimeout(threadsRecentlyRefreshedTimer);
      }

      const ms = environment.answersRefreshTimeMs || 60000;
      const timer = recentlyRefreshed
        ? setTimeout(() => this.store.dispatch(setThreadsRecentlyRefreshedTimer({timer: null})), ms)
        : null;

      return setThreadsRecentlyRefreshedTimer({timer});
    })
  );
}
