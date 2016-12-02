import { AnswersEffects } from './answers/answers.effects';
import { FormsEffects } from './forms/forms.effects';
import { FORMS_LOAD } from './forms/forms.actions';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { appStore } from './app.reducers';
import { EffectsTestingModule } from '@ngrx/effects/testing';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { NgModule } from '@angular/core';
import * as _ from 'lodash';

@NgModule({
    imports: [
        appStore,
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(FormsEffects),
        EffectsModule.run(AnswersEffects)
    ]
})
export class AppStoreModule {

}