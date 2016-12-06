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

export let appRoutes: Routes = [
    {
        // name: 'home',
        path: '',
        pathMatch:'full',
        canActivate: [HomeGuard],
        redirectTo:'/raspunsuri'

    }, {

        path: 'raspunsuri',
        component: AnswerComponent,
        canActivate: [AnswerListGuard],
        children: [{
            path: 'detalii/:idObservator/:idSectie',
            canActivate: [AnswerDetailsGuard]
        }]
    },
    {
        path: 'statistici',
        pathMatch:'full',
        component: StatisticsComponent,
        canActivate: [LoadStatisticsGuard]
    }
]