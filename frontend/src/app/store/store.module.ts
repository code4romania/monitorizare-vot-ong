import { AnswerEffects } from './answer/answer.effects';
import { answerReducer, AnswerState } from './answer/answer.reducer';
import { FormLoadAction } from './form/form.actions';
import { FormEffects } from './form/form.effects';
import { formReducer, FormState } from './form/form.reducer';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export class AppState {
    form: FormState
    answer: AnswerState
}

@NgModule({
    imports: [
        StoreModule.provideStore({ form: formReducer, answer: answerReducer }),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(FormEffects),
        EffectsModule.run(AnswerEffects)
    ]
})
export class AppStoreModule {
    constructor(store: Store<AppState>) {
        store.dispatch(new FormLoadAction(['A', 'B', 'C']));
    }
}