import { RouterState } from '@ngrx/router-store';

import { answersInitialState, AnswersState } from './answers/answers.state';
import { formsInitialState, FormsState } from './forms/forms.state';
export class AppState {
    forms: FormsState
    answers: AnswersState
    router: RouterState
}
export let initialState: AppState = {
    forms: formsInitialState,
    answers: answersInitialState,
    router: {
        path: window.location.pathname + window.location.search
    }
}