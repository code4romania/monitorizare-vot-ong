import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TokenService } from '../core/token/token.service';
import { AnswerEffects } from './answer/answer.effects';
import { answerReducer, AnswerState } from './answer/answer.reducer';
import { FormClearAll, FormLoadAction } from './form/form.actions';
import { FormEffects } from './form/form.effects';
import { formReducer, FormState } from './form/form.reducer';
import { NgosEffects } from './ngos/ngos.effects';
import { ngosReducer } from './ngos/ngos.reducer';
import { NgosState } from './ngos/ngos.state';
import { NoteEffects } from './note/note.effects';
import { noteReducer, NoteState } from './note/note.reducer';
import { ObserversCountEffects, ObserversEffects } from './observers/observers.effects';
import { observersCountReducer, observersReducer } from './observers/observers.reducer';
import { ObserversCountState, ObserversState } from './observers/observers.state';
import { StatisticsEffects } from './statistics/statistics.effects';
import { statisticsReducer } from './statistics/statistics.reducer';
import { StatisticsState } from './statistics/statistics.state';

export class AppState {
  form: FormState;
  answer: AnswerState;
  statistics: StatisticsState;
  observers: ObserversState;
  ngos: NgosState;
  observersCount: ObserversCountState;
  note: NoteState;
}

const moduleImports = [
  StoreModule.forRoot({
    form: formReducer,
    answer: answerReducer,
    statistics: statisticsReducer,
    observers: observersReducer,
    note: noteReducer,
    observersCount: observersCountReducer,
    ngos: ngosReducer
  }),
  EffectsModule.forRoot([
    FormEffects,
    AnswerEffects,
    StatisticsEffects,
    ObserversEffects,
    NgosEffects,
    ObserversCountEffects,
    NoteEffects,
  ]),
  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
    logOnly: environment.production, // Restrict extension to log-only mode
  }),
];
if (!environment.production) {
  moduleImports.push(
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: false,
    })
  );
}

@NgModule({
  imports: moduleImports,
})
export class AppStoreModule {
  constructor(store: Store<AppState>, tokenService: TokenService) {
    tokenService.tokenStream.subscribe((token) => {
      const clearForms = !token;
      store
        .pipe(
          select((s) => s.form),
          take(1)
        )
        .subscribe((s) => {
          if (clearForms || s.items.length > 0) {
            store.dispatch(new FormClearAll());
          }
          if (!clearForms) {
            store.dispatch(new FormLoadAction());
          }
        });
    });
  }
}
