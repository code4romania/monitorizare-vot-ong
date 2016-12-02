import { answersReducer } from './answers/answers.reducer';
import { initialState } from './app.state';
import { StoreModule } from '@ngrx/store';
import { formsReducer } from './forms/forms.reducer';




let appReducers = {
    forms: formsReducer,
    answers: answersReducer

}

export let appStore = StoreModule.provideStore(appReducers, initialState);