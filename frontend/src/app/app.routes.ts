import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswersContainerComponent } from './components/answers-container/answers-container.component';
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

    }];