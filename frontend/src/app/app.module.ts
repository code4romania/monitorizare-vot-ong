import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswerNotesComponent } from './components/answer-notes/answer-notes.component';
import { AnswersContainerComponent } from './components/answers-container/answers-container.component';
import { AnswersListComponent } from './components/answers-list/answers-list.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { CoreModule } from './core/core.module';
import { FormEffects } from './effects/form-effects';
import { HomeRedirectResolver } from './redirect.resolver';
import { FORMS_LOAD, formsReducer } from './reducers/forms.reducer';
import { AnswersService } from './services/answers.service';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';






EffectsModule.run(FormEffects)

@NgModule({
  declarations: [
    AppComponent,

    AnswersListComponent, AnswerDetailsComponent, AnswerNotesComponent,

    HeaderComponent,

    StatisticsTopComponent, StatisticsDetailsComponent, AnswersContainerComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(appRoutes,{
      enableTracing: true
    }) ,

    EffectsModule.run(FormEffects),

    StoreModule.provideStore({ forms: formsReducer }),

    StoreDevtoolsModule.instrumentOnlyWithExtension()


  ],

  providers: [
    AnswersService,
    HomeRedirectResolver,


  ],

  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(store: Store<any>) {
    store.dispatch({
      type: FORMS_LOAD
    });
  }
}
