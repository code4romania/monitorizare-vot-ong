import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {AnswerExtraQuestionsComponent} from './answer/answer-extra-questions/answer-extra-questions.component';
import {LoginComponent} from './login/login.component';
import {StatisticsValueComponent} from './statistics/statistics-value/statistics-value.component';
import {AnswerNoteComponent} from './answer/answer-note/answer-note.component';
import {StatisticsDetailsComponent} from './statistics/statistics-details/statistics-details.component';
import {CategoricalQuestionComponent} from './answer/categorical-question/categorical-question.component';
import {StatisticsCardComponent} from './statistics/statistics-card/statistics-card.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AnswerFormListComponent} from './answer/answer-form-list/answer-form-list.component';
import {AnswerDetailsComponent} from './answer/answer-details/answer-details.component';
import {AnswerComponent} from './answer/answer.component';
import {ObserversComponent} from './observers/observers.component';
import {AnswerListComponent} from './answer/answers-list/answer-list.component';
import {HeaderComponent} from './header/header.component';
import {ObserverCardComponent} from './observers/observer-card/observer-card.component';
import {OberverRowComponent} from './observers/oberver-row/oberver-row.component';
import {ObserverProfileComponent} from './observers/observer-profile/observer-profile.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FormCreateComponent} from './forms/form-create/form-create.component';
import {SectionComponent} from './forms/section/section.component';
import {QuestionComponent} from './forms/question/question.component';
import {PredefinedOptionsModalComponent} from './forms/predefined-options-modal/predefined-options-modal.component';
import {OptionComponent} from './forms/option/option.component';
import {FormsComponent} from './forms/forms.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {TableModule} from '../table/table.module'
import {ObserverImportComponent} from './observers/observer-import/observer-import.component';
import {NotificationHistoryComponent} from './notifications/notification-history/notification-history.component';

export let components = [
  AnswerComponent,
  AnswerListComponent,
  AnswerDetailsComponent,
  AnswerFormListComponent,
  AnswerNoteComponent,
  CategoricalQuestionComponent,
  AnswerExtraQuestionsComponent,
  ObserversComponent,
  ObserverCardComponent,
  OberverRowComponent,
  ObserverProfileComponent,
  FormsComponent,
  FormCreateComponent,
  SectionComponent,
  QuestionComponent,
  PredefinedOptionsModalComponent,
  OptionComponent,
  HeaderComponent,
  StatisticsComponent,
  StatisticsCardComponent,
  StatisticsDetailsComponent,
  StatisticsValueComponent,
  NotificationsComponent,
  NotificationHistoryComponent,
  LoginComponent,
  ObserverImportComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    DragDropModule,
    TableModule,
  ]
})
export class ComponentsModule {

}

