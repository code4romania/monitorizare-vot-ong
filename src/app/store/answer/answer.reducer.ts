import { AnswerExtra } from '../../models/answer.extra.model';
import { Note } from '../../models/note.model';
import { shouldLoadPage } from '../../shared/pagination.service';
import { AnswerThread } from '../../models/answer.thread.model';
import { CompletedQuestion } from '../../models/completed.question.model';
import { AnswerActions, AnswerActionTypes } from './answer.actions';
import { AnswerFilters } from '../../models/answer.filters.model';
export class AnswerState {
    threads: AnswerThread[] = [];
    urgent: boolean = undefined;
    page = 1;
    pageSize = 10;
    totalItems: number = undefined;
    totalPages: number = undefined;
    threadsLoading = false;
    threadsError = false;

    selectedAnswer: CompletedQuestion[];
    selectedLoading = false;
    selectedError = false;
    observerId: number;
    sectionId: number;

    notes: Note[];
    notesLoading: boolean;
    notesError: boolean;

    answerExtra: AnswerExtra;
    answerExtraLoading = false;
    answerExtraError = false;

    answerFilters: AnswerFilters = { observerPhone: null, pollingStationNumber: null, county: null };
}
export let initialAnswerState: AnswerState = new AnswerState();

export function answerReducer(state = initialAnswerState, action: AnswerActions) {
    switch (action.type) {
        case AnswerActionTypes.LOAD_PREVIEW:
            const newList = action.payload.refresh || (action.payload.urgent !== state.urgent),
                shouldLoadList = shouldLoadPage(action.payload.page, action.payload.pageSize, state.threads.length);
            const shouldUpdateFilters = Object.keys(action.payload.answerFilters).length > 0 ? true : false;

            let newState = Object.assign({}, state, {
                page: action.payload.page,
                answerFilters: shouldUpdateFilters ? action.payload.answerFilters : state.answerFilters,
                pageSize: action.payload.pageSize,
                threads: newList ? [] : state.threads,
                threadsLoading: shouldLoadList || newList,
                threadsError: false,
                urgent: action.payload.urgent
            });
            // if we're loading a new list, deselect any selected answer
            if (newList) {
                newState = Object.assign({}, newState, {
                    selectedAnswer: undefined,
                    selectedLoading: false,
                    selectedError: false,
                    observerId: undefined,
                    sectionId: undefined,
                    answerExtra: undefined,
                    answerExtraLoading: false,
                    answerExtraError: false
                });
            }
            return newState;

        case AnswerActionTypes.LOAD_PREVIEW_ERROR:
            return Object.assign({}, state, {
                threadsLoading: false,
                threadsError: true,

            });
        case AnswerActionTypes.LOAD_PREVIEW_DONE:
            return Object.assign({}, state, {
                threads: state.threads.concat(action.payload.threads),
                totalItems: action.payload.totalItems,
                totalPages: action.payload.totalPages,
                threadsLoading: false,
                threadsError: false
            });
        case AnswerActionTypes.LOAD_DETAILS:
            return Object.assign({}, state, action.payload, {
                selectedLoading: true,
                selectedError: false
            });
        case AnswerActionTypes.LOAD_DETAILS_ERROR:
            return Object.assign({}, state, {
                selectedLoading: false,
                selectedError: true
            });
        case AnswerActionTypes.LOAD_DETAILS_DONE:
            return Object.assign({}, state, {
                selectedAnswer: action.payload,
                selectedLoading: false,
                selectedError: false
            });
        case AnswerActionTypes.LOAD_EXTRA:
            return Object.assign({}, state, {
                answerExtraLoading: false,
                answerExtraError: false
            });
        case AnswerActionTypes.LOAD_EXTRA_DONE:
            return Object.assign({}, state, {
                answerExtra: action.payload,
                answerExtraLoading: false,
                selectedError: false
            });
        case AnswerActionTypes.LOAD_EXTRA_ERROR:
            return Object.assign({}, state, {
                answerExtraLoading: false,
                selectedError: true
            });
        default:
            return state;
    }
}
