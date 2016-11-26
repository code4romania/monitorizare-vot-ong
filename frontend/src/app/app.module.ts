import { AnswersService } from './shared/answers.service';
import { AnswersListComponent } from './components/answers-list/answers-list.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { HeaderComponent } from './components/header/header.component';
import { map } from 'rxjs/operator/map';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswerNotesComponent } from './components/answer-notes/answer-notes.component';


@NgModule({
  declarations: [
    AppComponent,

    AnswersListComponent, AnswerDetailsComponent, AnswerNotesComponent,

    HeaderComponent,
    
    StatisticsTopComponent, StatisticsDetailsComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    appRoutes,
  ],

  providers: [
    AnswersService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(service: AnswersService) {
    service.getAllForms().subscribe(value => {
      debugger;
    });
  }
 }
