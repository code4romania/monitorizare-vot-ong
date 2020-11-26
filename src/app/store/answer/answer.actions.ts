import { AnswerExtra } from '../../models/answer.extra.model';
import { AnswerThread } from '../../models/answer.thread.model';
import { AnswerFilters } from '../../models/answer.filters.model';
import { CompletedQuestion } from '../../models/completed.question.model';
import { actionType } from '../util';
import { Action, createAction, props } from '@ngrx/store';


export class AnswerActionTypes {
    static readonly LOAD_PREVIEW = actionType('[Answer] Load preview');
    static readonly LOAD_PREVIEW_ERROR = actionType('[Answer] Load preview error');
    static readonly LOAD_PREVIEW_DONE = actionType('[Answer] Load preview done');
    static readonly LOAD_DETAILS = actionType('[Answer] Load details');
    static readonly LOAD_DETAILS_DONE = actionType('[Answer] Load details done');
    static readonly LOAD_DETAILS_ERROR = actionType('[Answer] Load details error');
    static readonly LOAD_EXTRA = actionType('answer/load extra');
    static readonly LOAD_EXTRA_DONE = actionType('answer/load extra done');
    static readonly LOAD_EXTRA_ERROR = actionType('answer/load extra error');
}
export class LoadAnswerPreviewAction implements Action {
    readonly type = AnswerActionTypes.LOAD_PREVIEW;

    payload: {
        page: number,
        pageSize: number,
        refresh: boolean,
        answerFilters?: AnswerFilters
    };
    constructor(page = undefined, pageSize = undefined, refresh = false, answerFilters = undefined) {
        this.payload = {
            page,
            pageSize,
            refresh,
            answerFilters,
        };
    }
}
export class LoadAnswerPreviewErorrAction implements Action {
    readonly type = AnswerActionTypes.LOAD_PREVIEW_ERROR;
}
export class LoadAnswerPreviewDoneAction implements Action {
    readonly type = AnswerActionTypes.LOAD_PREVIEW_DONE;
    payload: {
        threads: AnswerThread[]
        totalItems: number
        totalPages: number,
    };

    constructor(threads: AnswerThread[], totalItems: number, totalPages: number) {
        this.payload = {
            threads,
            totalItems,
            totalPages,
        };
    }
}
export class LoadAnswerDetailsAction implements Action {
    readonly type = AnswerActionTypes.LOAD_DETAILS;

    payload: {
        observerId: number
        sectionId: number
    };
    constructor(observerId: number, sectionId: number) {
        this.payload = {
            observerId,
            sectionId
        };
    }
}
export class LoadAnswerDetailsErrorAction implements Action {
    readonly type = AnswerActionTypes.LOAD_DETAILS_ERROR;
}
export class LoadAnswerDetailsDoneAction implements Action {
    readonly type = AnswerActionTypes.LOAD_DETAILS_DONE;

    payload: CompletedQuestion[];

    constructor(payload: CompletedQuestion[]) {
        this.payload = payload;
    }
}
export class LoadAnswerExtraAction implements Action {
    readonly type = AnswerActionTypes.LOAD_EXTRA;

    payload: {
        observerId: number
        sectionId: number
    };
    constructor(observerId: number, sectionId: number) {
        this.payload = {
            observerId,
            sectionId
        };
    }
}
export class LoadAnswerExtraDoneAction implements Action {
    readonly type = AnswerActionTypes.LOAD_EXTRA_DONE;
    constructor(public payload: AnswerExtra) { }
}
export class LoadAnswerExtraErrorAction implements Action {
    readonly type = AnswerActionTypes.LOAD_EXTRA_ERROR;
}
export type AnswerActions =
    LoadAnswerPreviewAction |
    LoadAnswerPreviewErorrAction |
    LoadAnswerPreviewDoneAction |
    LoadAnswerDetailsAction |
    LoadAnswerDetailsErrorAction |
    LoadAnswerDetailsDoneAction |
    LoadAnswerExtraAction |
    LoadAnswerExtraDoneAction |
    LoadAnswerExtraErrorAction;

export const updateFilters = createAction(
    '[Answers Page] Update Filters',
    props<Partial<{ pollingStationNumber: number; county: string; observerPhoneNumber: string }>>()
);

export const updatePageInfo = createAction(
    '[Answers Page] Update `page` info',
    props<{ page: number, pageSize?: number }>()
);

export const setAnswersLoadingStatus = createAction(
    '[Answers Page] Set Answer\'s Loading Status',
    props<{ isLoading: boolean }>()
);