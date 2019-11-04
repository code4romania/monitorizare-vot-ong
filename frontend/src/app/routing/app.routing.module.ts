import {appRoutes} from './app.routes';
import {RouterModule} from '@angular/router';
import {LoadStatisticsGuard} from './guards/load-statistics.guard';
import {AnswerDetailsGuard} from './guards/load-anwer-details.guard';
import {AnswerListGuard} from './guards/load-answer-list.guard';
import {HomeGuard} from './guards/home.guard';
import {NgModule} from '@angular/core';
import {EditableFormsGuard} from './guards/editable-forms.guard';
import {EditableFormSectionsGuard} from './guards/editable-form-sections.guard';
import {EditableFormSectionQuestionsGuard} from './guards/editable-form-section-questions.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{
            enableTracing: false
            // enableTracing: !environment.production
        })
    ],
    providers: [HomeGuard, AnswerListGuard, AnswerDetailsGuard, LoadStatisticsGuard,
      EditableFormsGuard, EditableFormSectionsGuard, EditableFormSectionQuestionsGuard]
})
export class AppRoutingModule {

}
