import { PaginationData } from '../../shared/pagination.interface';
import { AnswerPreview } from '../../models/answer-preview.model';
import { Action } from '@ngrx/store';
export const ANSWERS_LIST_LOAD = "ANSWERS_LIST_LOAD";
export const ANSWERS_LIST_LOADED = "";
export const ANSWERS_LIST_ERROR = "ANSWERS_LIST_ERROR";
export const ANSWERS_DETAIL_LOAD = "ANSWERS_DETAIL_LOAD";
export const ANSWERS_DETAIL_LOADED = "ANSWERS_DETAIL_LOADED";
export const ANSWERS_DETAIL_ERROR = "ANSWERS_DETAIL_ERROR";


export interface AnswersListLoadPayload {
    urgent: boolean;
    pagination: PaginationData
}
export class AnswerListLoadAction implements Action {
    static key = "ANSWER_LIST_LOAD";

    type: string;
    payload: AnswersListLoadPayload;
    constructor(urgent: boolean, pagination: PaginationData) {

        this.type = AnswerListLoadAction.key;
        this.payload = {
            urgent: urgent,
            pagination: pagination
        }

    }

}
export class AnswerListLoadedAction implements Action {

    static key = "ANSWERS_LIST_LOADED";
    type: string;
    payload: AnswerPreview[];

    constructor(items: AnswerPreview[]) {

        this.type = AnswerListLoadAction.key;
        this.payload = items;

    }
}

export interface AnswerDetailsLoadPayload {
    observerId: number
    sectionId: number
}
export class AnswerDetailsLoadAction implements Action {
    static key = "ANSWER_DETAIL_LOAD";

    type: string;
    payload: any;

    constructor(observerId: number, sectionId: number) {

        this.type = AnswerDetailsLoadAction.key;
        this.payload = {
            observerId: observerId,
            sectionId: sectionId
        }

    }
}