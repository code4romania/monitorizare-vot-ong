import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { AnswerExtraQuestionsComponent } from './answer/answer-extra-questions/answer-extra-questions.component';
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
import { ObserversComponent } from './observers/observers.component';
import { AnswerListComponent } from './answer/answers-list/answer-list.component';
import { HeaderComponent } from './header/header.component';
import { ObserversCardComponent } from './observers/observers-card/observers-card.component';
import { ObserverProfileComponent } from './observers/observer-profile/observer-profile.component';
import {EditableFormsComponent} from './editable-forms/editable-forms.component';
import {EditableFormSectionsComponent} from './editable-forms/editable-form-sections/editable-form-sections.component';
import {FormSectionMenuComponent} from './editable-forms/editable-form-sections/form-section-menu/form-section-menu.component';
import {FormSectionCardComponent} from './editable-forms/editable-form-sections/form-section-card/form-section-card.component';
import {QuestionCardComponent} from './editable-forms/form-section-questions/question-card/question-card.component';
import {FormSectionQuestionsComponent} from './editable-forms/form-section-questions/form-section-questions.component';
import {QuestionMenuComponent} from './editable-forms/form-section-questions/question-menu/question-menu.component';
import {MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatSelectModule} from '@angular/material';

export let components = [
    AnswerComponent, AnswerListComponent,
    AnswerDetailsComponent,
    AnswerFormListComponent,
    AnswerNoteComponent,
    CategoricalQuestionComponent,
    AnswerExtraQuestionsComponent,
    AnswerNoteComponent,
    ObserversComponent,
    ObserversCardComponent,
    ObserverProfileComponent,

  HeaderComponent,

  StatisticsComponent,
  StatisticsCardComponent,
  StatisticsDetailsComponent,
  StatisticsValueComponent,

  LoginComponent,
  EditableFormsComponent,
  EditableFormSectionsComponent,
  FormSectionMenuComponent,
  FormSectionCardComponent,
  FormSectionQuestionsComponent,
  QuestionCardComponent,
  QuestionMenuComponent

];

@NgModule({
  declarations: components,
  exports: [
    ...components,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ]
})
export class ComponentsModule {

}

