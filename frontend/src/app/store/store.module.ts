import { environment } from '../../environments/environment';
import { TokenService } from '../core/token/token.service';
import { NoteEffects } from './note/note.effects';
import { noteReducer, NoteState } from './note/note.reducer';
import { StatisticsState } from './statistics/statistics.state';
import { StatisticsEffects } from './statistics/statistics.effects';
import { statisticsReducer } from './statistics/statistics.reducer';
import { AnswerEffects } from './answer/answer.effects';
import { answerReducer, AnswerState } from './answer/answer.reducer';
import { FormClearAll, FormLoadAction } from './form/form.actions';
import { FormEffects } from './form/form.effects';
import { formReducer, FormState } from './form/form.reducer';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ObserversState, ObserversCountState } from './observers/observers.state';
import {ObserversEffects, ObserversCountEffects} from './observers/observers.effects';
import {observersReducer, observersCountReducer} from './observers/observers.reducer';
import {editableFormsReducer, EditableFormsState} from './editable-forms/editable.forms.reducer';
import {EditableFormsEffects} from './editable-forms/editable.forms.effects';

export class AppState {
    form: FormState;
    answer: AnswerState;
    statistics: StatisticsState;
    observers: ObserversState;
    observersCount: ObserversCountState;
    note: NoteState;
    editableForms: EditableFormsState;
}

let moduleImports = [
    StoreModule.forRoot({ form: formReducer, answer: answerReducer, statistics: statisticsReducer, observers: observersReducer, note: noteReducer , observersCount: observersCountReducer, editableForms: editableFormsReducer}),
    EffectsModule.forRoot([
      FormEffects,
      AnswerEffects,
      StatisticsEffects,
      ObserversEffects,
      ObserversCountEffects,
      NoteEffects,
      EditableFormsEffects
    ]),
];
if (!environment.production) {
    moduleImports.push(StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: false
    }))
}

@NgModule({
    imports: moduleImports
})
export class AppStoreModule {
    constructor(store: Store<AppState>, tokenService: TokenService) {
        tokenService.tokenStream.subscribe((token) => {
            let clearForms = !token;
            store.select(s => s.form).take(1).subscribe(s => {
                if (clearForms || s.items.length > 0) {
                    store.dispatch(new FormClearAll());
                }
                if (!clearForms) {
                    store.dispatch(new FormLoadAction());
                }
            })
        });
    }
}
