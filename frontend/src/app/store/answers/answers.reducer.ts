import { getPaginationState } from '../shared/pagination.state';
import { getRequestState } from '../shared/request.state';
import {
    ANSWERS_DETAIL_LOAD,
    ANSWERS_DETAIL_LOADED,
    ANSWERS_LIST_ERROR,
    ANSWERS_LIST_LOAD,
    ANSWERS_LIST_LOADED
} from './answers.actions';
import { AnswersDetailsState, AnswersListState, AnswersState } from './answers.state';
import { Action } from '@ngrx/store';
export const answersReducer = (state: AnswersState, action: Action): AnswersState => {
    switch (action.type) {
        case ANSWERS_LIST_ERROR:
        case ANSWERS_LIST_LOADED:
        case ANSWERS_LIST_LOAD:
            return Object.assign({}, state, {
                answersList: answersListReducer(state.answersList, action)
            })
        case ANSWERS_DETAIL_LOAD:
        case ANSWERS_DETAIL_LOADED:
            return Object.assign({}, state, {
                answersDetails: answerDetailsReducer(state.answersDetails, action)
            })
        default:
            return state
    }
}

const answerDetailsReducer = (state: AnswersDetailsState, action: Action): AnswersDetailsState => {
    switch (action.type) {
        case ANSWERS_DETAIL_LOAD:
            return Object.assign({}, state, {
                items: [],

                observerId: action.payload.observerId,
                sectionId: action.payload.observerId,

                request: getRequestState(true)
            })
        case ANSWERS_DETAIL_LOADED:
            return Object.assign({}, state, {
                items: action.payload,
                request: getRequestState()
            })
        default:
            return state
    }
}
const answersListReducer = (state: AnswersListState, action: Action): AnswersListState => {
    switch (action.type) {
        case ANSWERS_LIST_LOAD:
            let urgent = action.payload.urgent || false
            return Object.assign({}, state, {
                questions: state.urgent !== urgent ? state.items : [],

                urgent: urgent || false,
                request: getRequestState(true)
            })
        case ANSWERS_LIST_LOADED:
            return {
                items: state.items.concat(action.payload.data),
                urgent: state.urgent,
                pagination: getPaginationState(action.payload.page, action.payload.pageSize, action.payload.total),
                request: getRequestState()
            }
        default:
            return state

    }
}