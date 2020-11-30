import { AnonGuard } from '../core/anon.guard';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../core/authGuard/auth.guard';
import { StatisticsDetailsComponent } from '../components/statistics/statistics-details/statistics-details.component';
import { ObserversComponent } from '../components/observers/observers.component';
import { AnswerDetailsComponent } from '../components/answer/answer-details/answer-details.component';
import { LoadStatisticsGuard } from './guards/load-statistics.guard';
import { AnswerDetailsGuard } from './guards/load-anwer-details.guard';
import { AnswerListGuard } from './guards/load-answer-list.guard';
import { HomeGuard } from './guards/home.guard';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { AnswerComponent } from '../components/answer/answer.component';
import { Routes } from '@angular/router';
import { ObserverProfileComponent } from '../components/observers/observer-profile/observer-profile.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { FormsComponent } from '../components/forms/forms.component';
import { FormCreateComponent } from '../components/forms/form-create/form-create.component';
import { ObserverImportComponent } from '../components/observers/observer-import/observer-import.component';
import {NotificationHistoryComponent} from '../components/notifications/notification-history/notification-history.component';

export let appRoutes: Routes = [
  {
    // name: 'home',
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, HomeGuard],
    redirectTo: '/answers',
  },
  {
    path: 'answers',
    loadChildren: () => import('src/app/answers/answers.module').then(m => m.AnswersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard, LoadStatisticsGuard],
  },
  {
    path: 'observatori',
    component: ObserversComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observatori/profil/:state',
    component: ObserverProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observatori/profil/:state/:id',
    component: ObserverProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observatori/import',
    component: ObserverImportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics/:key',
    component: StatisticsDetailsComponent,
    canActivate: [AuthGuard, LoadStatisticsGuard],
  },
  {
    path: 'formulare',
    component: FormsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'formulare/nou',
    component: FormCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'formulare/:formId',
    component: FormCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    canActivate: [AnonGuard],
    component: LoginComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications/history',
    component: NotificationHistoryComponent,
    canActivate: [AuthGuard]
  }
];
