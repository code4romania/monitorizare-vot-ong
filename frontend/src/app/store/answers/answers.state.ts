import { AnswerPreview } from '../../models/answer-preview.model';
import { Question } from '../../models/question.model';
import { getPaginationState, PaginationState } from '../shared/pagination.state';
import { getRequestState, RequestState } from '../shared/request.state';
export class AnswersState {
    answersList: AnswersListState
    answersDetails: AnswersDetailsState
}
export class AnswersListState {
    items: AnswerPreview[]


    urgent: boolean

    pagination: PaginationState
    request: RequestState
}
export class AnswersDetailsState {
    items: Question[]

    request: RequestState

    observerId: number
    sectionId: number
}

export let defaultPaginationState = getPaginationState(1,20);
export let defaultRequestState = getRequestState();
export let answersInitialState: AnswersState = {
    answersList: {
        items: [],

        urgent: false,

        pagination: defaultPaginationState,
        request: defaultRequestState
    },
    answersDetails: {
        items: [],
        request: defaultRequestState,

        observerId: undefined,
        sectionId: undefined

    }
}