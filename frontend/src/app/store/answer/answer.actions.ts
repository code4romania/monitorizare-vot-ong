import { AnswerThread } from '../../models/answer.thread.model';
import { actionType } from '../util';
import { Action } from '@ngrx/store';
export const AnswerActionTypes = {
    LOAD_PREVIEW: actionType('[Answer] Load preview'),
    LOAD_PREVIEW_ERROR: actionType('[Answer] Load preview error'),
    LOAD_PREVIEW_DONE: actionType('[Answer] Load preview done')
}
export class LoadAnswerPreviewAction implements Action {
    type = AnswerActionTypes.LOAD_PREVIEW;

    payload: {
        page: number,
        pageSize: number,
        urgent: boolean
    }
    constructor(urgent: boolean, page:number, pageSize: number) {
        this.payload = {
            urgent,
            page,
            pageSize
        }
    }
}
export class LoadAnswerPreviewDoneAction implements Action {
    type = AnswerActionTypes.LOAD_PREVIEW_DONE;
    payload: {
        threads: AnswerThread[]
        totalItems: number
        totalPages: number
    }

    constructor(threads: AnswerThread[], totalItems: number, totalPages: number){
        this.payload = {
            threads,
            totalItems,
            totalPages
        }
    }
}

export type AnswerActionTypes = LoadAnswerPreviewAction | LoadAnswerPreviewDoneAction;