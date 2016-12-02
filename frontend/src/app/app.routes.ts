import { AnswerDetailsResolver } from './store/answers/answers-details.resolver';
import { AnswersComponent } from './components/answers/answers.component';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswersListComponent } from './components/answers-list/answers-list.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { HomeRedirectResolver } from './redirect.resolver';
import { resolve } from 'dns';


export let appRoutes = [
    {
        path: '',
        children: [],
        resolve: {
            redirect: HomeRedirectResolver
        }
    }, {
        path: 'raspunsuri',
        component: AnswersComponent,
        children: [
            {
                path: 'urgente',
                data: { urgent: true },
                children: [
                    { path: 'detalii/:idObservator/:idSectie',component:AnswerDetailsComponent, resolve: { dispatch: AnswerDetailsResolver } },
                    { path: '' }
                ]
            }, {
                path: 'detalii/:idObservator/:idSectie',component:AnswerDetailsComponent, resolve: { dispatch: AnswerDetailsResolver }
            }, {
                path: '',
            }, {
                path: '**',
                redirectTo: '/'
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

    }];