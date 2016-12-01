import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { RouterModule, Routes } from '@angular/router';
import { AnswersListComponent } from './components/answers-list/answers-list.component';


export let appRoutes = RouterModule.forRoot([
    {
        path: '',
        component: AnswersListComponent,
        data: { urgent: true},
    }, {
        path: 'raspunsuri',
        children: [
            {
                path: '',
                component: AnswersListComponent
            }, {
                path:'detalii/:idObservator/:idSectie',
                component: AnswerDetailsComponent
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
        enableTracing: false,
    });;