import { HomeRedirectResolver } from './redirect.resolver';
import { resolve } from 'dns';
import { AnswersContainerComponent } from './components/answers-container/answers-container.component';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AnswersListComponent } from './components/answers-list/answers-list.component';


export let appRoutes = RouterModule.forRoot([
    {
        path: '',
        children:[],
        resolve: {
            redirect: HomeRedirectResolver
        }
    }, {
        path: 'raspunsuri',
        component: AnswersContainerComponent,
        children: [
            {
                path: '',
                component: AnswersListComponent
            }, {
                path: 'detalii/:idObservator/:idSectie',
                component: AnswerDetailsComponent,
                outlet: 'answers'
            }
        ],
    }, {
        path: 'statistici',
        children: [{
            path: '',
            component: StatisticsTopComponent
        }, {
            path: ':index',
            component: StatisticsDetailsComponent
        }]

    }], {
        enableTracing: true,
    });;