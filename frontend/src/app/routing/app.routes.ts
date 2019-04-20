import { AnonGuard } from '../core/anon.guard';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../core/authGuard/auth.guard';
import { StatisticsDetailsComponent } from '../components/statistics/statistics-details/statistics-details.component';
import { AnswerDetailsComponent } from '../components/answer/answer-details/answer-details.component';
import { AnswerListComponent } from '../components/answer/answers-list/answer-list.component';
import { LoadStatisticsGuard } from './guards/load-statistics.guard';
import { AnswerDetailsGuard } from './guards/load-anwer-details.guard';
import { AnswerListGuard } from './guards/load-answer-list.guard';
import { HomeGuard } from './guards/home.guard';
import { StatisticsComponent } from '..//components/statistics/statistics.component';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from '..//store/answer/answer.actions';
import { AppState } from '..//store/store.module';
import { AnswerComponent } from '..//components/answer/answer.component';
import { Store } from '@ngrx/store';
import { Routes } from '@angular/router';
import {EditableFormsComponent} from '../components/editable-forms/editable-forms.component';

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
        canActivate: [AuthGuard],
        component: EditableFormsComponent
    }
]
