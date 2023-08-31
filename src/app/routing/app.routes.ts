import { AnonGuard } from '../core/anon.guard';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../core/authGuard/auth.guard';
import { StatisticsDetailsComponent } from '../components/statistics/statistics-details/statistics-details.component';
import { ObserversComponent } from '../components/observers/observers.component';
import { LoadStatisticsGuard } from './guards/load-statistics.guard';
import { HomeGuard } from './guards/home.guard';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { Routes } from '@angular/router';
import { ObserverProfileComponent } from '../components/observers/observer-profile/observer-profile.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { FormsComponent } from '../components/forms/forms.component';
import { FormCreateComponent } from '../components/forms/form-create/form-create.component';
import { ObserverImportComponent } from '../components/observers/observer-import/observer-import.component';
import { NotificationHistoryComponent } from '../components/notifications/notification-history/notification-history.component';
import { CountiesComponent } from '../components/counties/counties.component';

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
    path: 'observers',
    component: ObserversComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observers/profile/:state',
    component: ObserverProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observers/profile/:state/:id',
    component: ObserverProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'observers/import',
    component: ObserverImportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics/:key',
    component: StatisticsDetailsComponent,
    canActivate: [AuthGuard, LoadStatisticsGuard],
  },
  {
    path: 'forms',
    component: FormsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forms/new',
    component: FormCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forms/:formId',
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
  },
  {
    path: 'counties',
    component: CountiesComponent,
    canActivate: [AuthGuard]
  }
];
