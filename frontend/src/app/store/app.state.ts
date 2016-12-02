import { answersInitialState, AnswersState } from './answers/answers.state';
import { formsInitialState, FormsState } from './forms/forms.state';

export class AppState {
    forms: FormsState
    answers: AnswersState
}
export let initialState: AppState = {
    forms: formsInitialState,
    answers: answersInitialState,
}