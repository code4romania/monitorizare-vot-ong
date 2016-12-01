import { HomeRedirectResolver } from './redirect.resolver';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswerNotesComponent } from './components/answer-notes/answer-notes.component';
import { AnswersListComponent } from './components/answers-list/answers-list.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { CoreModule } from './core/core.module';
import { AnswersService } from './services/answers.service';
import { FormsService } from './services/form.service';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnswersContainerComponent } from './components/answers-container/answers-container.component';



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
    appRoutes,


  ],

  providers: [
    AnswersService,
    FormsService,
    HomeRedirectResolver
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private service: FormsService) {

    service.fetchForms().subscribe();

  }
}
