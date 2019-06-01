import {AnonGuard} from '../core/anon.guard';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from '../core/authGuard/auth.guard';
import {StatisticsDetailsComponent} from '../components/statistics/statistics-details/statistics-details.component';
import {AnswerDetailsComponent} from '../components/answer/answer-details/answer-details.component';
import {LoadStatisticsGuard} from './guards/load-statistics.guard';
import {AnswerDetailsGuard} from './guards/load-anwer-details.guard';
import {AnswerListGuard} from './guards/load-answer-list.guard';
import {HomeGuard} from './guards/home.guard';
import {StatisticsComponent} from '../components/statistics/statistics.component';
import {AnswerComponent} from '../components/answer/answer.component';
import {Routes} from '@angular/router';
import {EditableFormsComponent} from '../components/editable-forms/editable-forms.component';
import {EditableFormSectionsComponent} from '../components/editable-forms/editable-form-sections/editable-form-sections.component';
import {EditableFormsGuard} from './guards/editable-forms.guard';
import {FormSectionQuestionsComponent} from '../components/editable-forms/form-section-questions/form-section-questions.component';
import {EditableFormSectionsGuard} from './guards/editable-form-sections.guard';

export let appRoutes: Routes = [
    {
        // name: 'home',
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard, HomeGuard],
        redirectTo: '/urgente'
    }, {
        path: 'raspunsuri',
        component: AnswerComponent,
        canActivate: [AuthGuard, AnswerListGuard ],
        children: [{
            path: 'detalii/:idObservator/:idSectie',
            component: AnswerDetailsComponent,
            canActivate: [AuthGuard, AnswerDetailsGuard]
        }, {
            path: '',
            canActivate: [AuthGuard],
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'urgente',
        component: AnswerComponent,
        canActivate: [AuthGuard, AnswerListGuard ],
        data: {
            urgent: true
        },
        children: [{
            path: 'detalii/:idObservator/:idSectie',
            component: AnswerDetailsComponent,
            canActivate: [AuthGuard, AnswerDetailsGuard]
        }, {
            path: '',
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'statistici',
        component: StatisticsComponent,
        canActivate: [AuthGuard, LoadStatisticsGuard]
    }, {
        path: 'statistici/:key',
        component: StatisticsDetailsComponent,
        canActivate: [AuthGuard, LoadStatisticsGuard]
    }, {
        path: 'login',
        canActivate: [AnonGuard],
        component: LoginComponent
    }, {
        path: 'forms',
        canActivate: [AuthGuard, EditableFormsGuard],
        component: EditableFormsComponent
    }, {
        path: 'forms/:id',
        canActivate: [AuthGuard, EditableFormSectionsGuard],
        component: EditableFormSectionsComponent
    }, {
        path: 'forms/:formSetId/:formId/questions',
        canActivate: [AuthGuard],
        component: FormSectionQuestionsComponent
    }
];
