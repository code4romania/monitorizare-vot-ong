import { Action } from '@ngrx/store';
import { AnswerActionTypes } from './answer.actions';
import { AnswerThread } from '../../models/answer.thread.model';
export class AnswerState {
    threads: AnswerThread[]
    urgent: boolean
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
}
export let initialAnswerState: AnswerState = new AnswerState()

export function answerReducer(state = initialAnswerState, action: AnswerActionTypes) {
    switch (action.type) {
        case AnswerActionTypes.LOAD_PREVIEW: {
            return Object.assign({}, state, action.payload, {
                threads: action.payload.urgent !== state.urgent ? [] : state.threads
            });
        }
        case AnswerActionTypes.LOAD_PREVIEW_DONE:
            return Object.assign({}, state, {
                threads: state.threads.concat(action.payload.threads),
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages
            });
        default:
            return state
    }
}

