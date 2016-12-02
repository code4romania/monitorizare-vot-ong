import { answersReducer } from './answers/answers.reducer';
import { initialState } from './app.state';
import { StoreModule } from '@ngrx/store';
import { formsReducer } from './forms/forms.reducer';

import { routerReducer} from '@ngrx/router-store';



let appReducers = {
    forms: formsReducer,
    answers: answersReducer,

    router: routerReducer

}

export let appStore = StoreModule.provideStore(appReducers, initialState);