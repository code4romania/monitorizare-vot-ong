import { AnswerThread } from '../../models/answer.thread.model';
import { CompletedQuestion } from '../../models/completed.question.model';
import { AnswerActionTypes } from './answer.actions';
export class AnswerState {
    threads: AnswerThread[]
    urgent: boolean = undefined
    page = 1
    pageSize = 10
    totalItems: number = undefined;
    totalPages: number = undefined

    selectedAnswer: CompletedQuestion[]
    observerId: number
    sectionId: number
}
export let initialAnswerState: AnswerState = new AnswerState()

export function answerReducer(state = initialAnswerState, action: AnswerActionTypes) {
    switch (action.type) {
        case AnswerActionTypes.LOAD_PREVIEW: {
            return Object.assign({}, state, action.payload, {
                threads: action.payload.refresh || (action.payload.urgent !== state.urgent) ? [] : state.threads
            });
        }
        case AnswerActionTypes.LOAD_PREVIEW_DONE:
            return Object.assign({}, state, {
                threads: state.threads.concat(action.payload.threads),
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages
            });
        case AnswerActionTypes.LOAD_DETAILS:
            return Object.assign({}, state, action.payload)
        case AnswerActionTypes.LOAD_DETAILS_DONE:
            return Object.assign({}, state, {
                selectedAnswer: action.payload
            });
        default:
            return state
    }
}

