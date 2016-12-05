import { AnswerFormListComponent } from './answer/answer-form-list/answer-form-list.component';
import { AppComponent } from '../app.component';
import { AnswerDetailsComponent } from './answer/answer-details/answer-details.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerListComponent } from './answer/answers-list/answer-list.component';
import { HeaderComponent } from './header/header.component';
import { StatisticsDetailsComponent } from './statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './statistics-top/statistics-top.component';


export let components = [
    AppComponent,

    AnswerComponent, AnswerListComponent,
     AnswerDetailsComponent, 
     AnswerFormListComponent,
    //  AnswerNotesComponent,

    HeaderComponent,

    StatisticsTopComponent, StatisticsDetailsComponent
] 