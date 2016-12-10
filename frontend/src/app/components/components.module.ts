import { LoginComponent } from './login/login.component';
import { StatisticsValueComponent } from './statistics/statistics-value/statistics-value.component';
import { AnswerNoteComponent } from './answer/answer-note/answer-note.component';
import { StatisticsDetailsComponent } from './statistics/statistics-details/statistics-details.component';
import { CategoricalQuestionComponent } from './answer/categorical-question/categorical-question.component';
import { StatisticsCardComponent } from './statistics/statistics-card/statistics-card.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AnswerFormListComponent } from './answer/answer-form-list/answer-form-list.component';
import { AppComponent } from '../app.component';
import { AnswerDetailsComponent } from './answer/answer-details/answer-details.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerListComponent } from './answer/answers-list/answer-list.component';
import { HeaderComponent } from './header/header.component';


export let components = [
    AppComponent,

    AnswerComponent, AnswerListComponent,
    AnswerDetailsComponent,
    AnswerFormListComponent,
    AnswerNoteComponent,
    CategoricalQuestionComponent,

    AnswerNoteComponent,


    HeaderComponent,

    StatisticsComponent,
    StatisticsCardComponent,
    StatisticsDetailsComponent,
    StatisticsValueComponent,

    LoginComponent


] 