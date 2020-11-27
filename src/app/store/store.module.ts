import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CountyEffects } from './county/county.effects';
import { countyReducer } from './county/county.reducer';

import { metaReducers } from './meta-reducers/';

import {
  ObserversState,
  ObserversCountState,
} from './observers/observers.state';
import {
  ObserversEffects,
  ObserversCountEffects,
} from './observers/observers.effects';
import {
  observersReducer,
  observersCountReducer,
} from './observers/observers.reducer';
import { CountyState } from './county/county.state';

export class AppState {
  form: FormState;
  answer: AnswerState;
  statistics: StatisticsState;
  observers: ObserversState;
  observersCount: ObserversCountState;
  note: NoteState;
  county: CountyState;
}

const moduleImports = [
  StoreModule.forRoot({
    form: formReducer,
    answer: answerReducer,
    statistics: statisticsReducer,
    observers: observersReducer,
    note: noteReducer,
    observersCount: observersCountReducer,
    county: countyReducer
  }, { metaReducers }),
  EffectsModule.forRoot([
    FormEffects,
    AnswerEffects,
    StatisticsEffects,
    ObserversEffects,
    ObserversCountEffects,
    NoteEffects,
    CountyEffects,
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
export class AppStoreModule { }
