import { AnswerExtra } from '../../models/answer.extra.model'
import { AnswerThread } from '../../models/answer.thread.model'
import { CompletedQuestion } from '../../models/completed.question.model'
import { actionType } from '../util'
import { Action } from '@ngrx/store'
export const AnswerActionTypes = {
    LOAD_PREVIEW: actionType('[Answer] Load preview'),
    LOAD_PREVIEW_ERROR: actionType('[Answer] Load preview error'),
    LOAD_PREVIEW_DONE: actionType('[Answer] Load preview done'),
    LOAD_DETAILS: actionType('[Answer] Load details'),
    LOAD_DETAILS_DONE: actionType('[Answer] Load details done'),
    LOAD_DETAILS_ERROR: actionType('[Answer] Load details error'),
    LOAD_EXTRA: actionType('answer/load extra'),
    LOAD_EXTRA_DONE: actionType('answer/load extra done'),
    LOAD_EXTRA_ERROR: actionType('answer/load extra error'),
}
export class LoadAnswerPreviewAction implements Action {
    type = AnswerActionTypes.LOAD_PREVIEW

    payload: {
        page: number,
        pageSize: number,
        urgent: boolean,
        refresh: boolean
    }
    constructor(urgent: boolean, page = 1, pageSize = 10, refresh = false) {
        this.payload = {
            urgent,
            page,
            pageSize,
            refresh
        }
    }
}
export class LoadAnswerPreviewErorrAction implements Action {
    type = AnswerActionTypes.LOAD_PREVIEW_ERROR
}
export class LoadAnswerPreviewDoneAction implements Action {
    type = AnswerActionTypes.LOAD_PREVIEW_DONE
    payload: {
        threads: AnswerThread[]
        totalItems: number
        totalPages: number
    }

    constructor(threads: AnswerThread[], totalItems: number, totalPages: number) {
        this.payload = {
            threads,
            totalItems,
            totalPages
        }
    }
}
export class LoadAnswerDetailsAction implements Action {
    type = AnswerActionTypes.LOAD_DETAILS

    payload: {
        observerId: number
        sectionId: number
    }
    constructor(observerId: number, sectionId: number) {
        this.payload = {
            observerId,
            sectionId
        }
    }
}
export class LoadAnswerDetailsErrorAction implements Action {
    type = AnswerActionTypes.LOAD_DETAILS_ERROR
}
export class LoadAnswerDetailsDoneAction implements Action {
    type = AnswerActionTypes.LOAD_DETAILS_DONE

    payload: CompletedQuestion[]

    constructor(payload: CompletedQuestion[]) {
        this.payload = payload
    }
}
export class LoadAnswerExtraAction implements Action {
    type = AnswerActionTypes.LOAD_EXTRA

    payload: {
        observerId: number
        sectionId: number
    }
    constructor(observerId: number, sectionId: number) {
        this.payload = {
            observerId,
            sectionId
        }
    }
}
export class LoadAnswerExtraDoneAction implements Action {
    type = AnswerActionTypes.LOAD_EXTRA_DONE
    constructor(public payload: AnswerExtra) {}
}
export class LoadAnswerExtraErrorAction implements Action {
    type = AnswerActionTypes.LOAD_EXTRA_ERROR
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
    LoadAnswerExtraErrorAction
