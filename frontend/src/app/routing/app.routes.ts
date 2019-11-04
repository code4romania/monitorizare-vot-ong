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
import {EditableFormsGuard} from './guards/editable-forms.guard';
import {EditableFormSectionsGuard} from './guards/editable-form-sections.guard';
import {EditableFormSectionsComponent} from '../components/editable-forms/editable-form-sections/editable-form-sections.component';
import {FormSectionQuestionsComponent} from '../components/editable-forms/form-section-questions/form-section-questions.component';
import {EditableFormSectionQuestionsGuard} from './guards/editable-form-section-questions.guard';
import { ObserversComponent } from '../components/observers/observers.component';
import { ObserverProfileComponent } from 'app/components/observers/observer-profile/observer-profile.component';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';

export let appRoutes: Routes = [
    {
        // name: 'home',
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard, HomeGuard],
        redirectTo: '/urgents'
    },
    {
        path: 'answers',
        component: AnswerComponent,
        canActivate: [AuthGuard, AnswerListGuard],
        children: [{
            path: 'details/:idObserver/:idPollingStation',
            component: AnswerDetailsComponent,
            canActivate: [AuthGuard, AnswerDetailsGuard]
        }, {
            path: '',
            canActivate: [AuthGuard],
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'urgents',
        component: AnswerComponent,
        canActivate: [AuthGuard, AnswerListGuard],
        data: {
            urgent: true
        },
        children: [{
            path: 'details/:idObserver/:idPollingStation',
            component: AnswerDetailsComponent,
            canActivate: [AuthGuard, AnswerDetailsGuard]
        }, {
            path: '',
            component: AnswerDetailsComponent
        }]
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthGuard, LoadStatisticsGuard]
    },
    {
        path: 'observatori',
        component: ObserversComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'observatori/profil/:state',
        component: ObserverProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'observatori/profil/:state/:id',
        component: ObserverProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'statistics/:key',
        component: StatisticsDetailsComponent,
        canActivate: [AuthGuard, LoadStatisticsGuard]
    },
    {
        path: 'login',
        canActivate: [AnonGuard],
        component: LoginComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard, EditableFormSectionQuestionsGuard],
        component: FormSectionQuestionsComponent
    }
];
