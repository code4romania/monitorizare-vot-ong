import { answerDetailsReducer, answersListReducer } from './answers/answers.reducer';
import { formsReducer } from './forms/forms.reducer';
import { StoreModule } from '@ngrx/store';




let appReducers = {
    forms: formsReducer,
    answers: {
        answersList: answersListReducer,
        answerDetails: answerDetailsReducer
    }

}

export let appStore = StoreModule.provideStore(appReducers);