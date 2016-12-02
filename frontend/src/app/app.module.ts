import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { HomeRedirectResolver } from './redirect.resolver';
import { AnswersService } from './services/answers.service';
import { SharedModule } from './shared/shared.module';
import { AppState } from './store/app.state';
import { FORMS_LOAD } from './store/forms/forms.actions';
import { storeImports } from './store/store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnswerDetailsResolver } from './store/answers/answers-details.resolver';

import { routerActions } from '@ngrx/router-store'






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ComponentsModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    }),



    storeImports
  ],

  providers: [
    AnswersService,
    HomeRedirectResolver,
    AnswerDetailsResolver
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(store: Store<AppState>) {
    store.dispatch({
      type: FORMS_LOAD
    });
    store.dispatch({
      type: routerActions.UPDATE_LOCATION,
      payload: {
        path: window.location.pathname + window.location.search
      }
    })
  }
}
