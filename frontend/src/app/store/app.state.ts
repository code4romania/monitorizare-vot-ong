import { AnswersDetailsState, AnswersListState, AnswersState } from './answers/answers.state';
import { FormsState } from './forms/forms.state';

export class AppState {
    forms: FormsState
    answers: {
        answersList: AnswersListState,
        answerDetails: AnswersDetailsState
    }
}