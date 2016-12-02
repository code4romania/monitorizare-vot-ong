import { FORMS_LOAD } from './forms/forms.actions';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { appStore } from './app.reducers';
import { EffectsTestingModule } from '@ngrx/effects/testing';
import { appEffects } from './app.effects';
import { EffectsModule } from '@ngrx/effects';
import { AppState } from './app.state';
import { NgModule } from '@angular/core';
import * as _ from 'lodash';

let optionalModules = [];

if (!environment.production) {
    optionalModules.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

export let storeImports = [appStore,
].concat(appEffects, optionalModules)

@NgModule({
    imports: storeImports
})
export class AppStoreModule {

}