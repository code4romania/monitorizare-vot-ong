import { answersReducer } from './answers/answers.reducer';
import { formsReducer } from './forms/forms.reducer';
import { StoreModule } from '@ngrx/store';




let appReducers = {
    forms: formsReducer,
    answers: answersReducer

}

export let appStore = StoreModule.provideStore(appReducers);