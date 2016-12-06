import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoadAnswerDetailsAction, LoadAnswerPreviewAction } from './store/answer/answer.actions';
import { AppState } from './store/store.module';
import { AnswerComponent } from './components/answer/answer.component';
import { Store } from '@ngrx/store';
import { Transition } from 'ui-router-ng2';

export let states = [
    {
        name: 'home',
        url: '/',
        redirectTo: { state: 'raspunsuri', params: { urgente: true } }
    }, {
        name: 'raspunsuri',
        url: '/raspunsuri?urgente',
        component: AnswerComponent,
        // resolve: [{
        //     token: 'dispatch',
        //     deps: [Store, Transition],
        //     resolveFn: (store: Store<AppState>, trans: Transition) => store.dispatch(new LoadAnswerPreviewAction(new Boolean(trans.params()['urgente']).valueOf(), 1, 10, true))
        // }],
    }, {
        name: 'raspunsuri.detalii',
        url: '/detalii/:idObservator/:idSectie',
        // resolve: [{
        //     token: 'dispatch',
        //     deps: [Store, Transition],
        //     resolveFn: (store: Store<AppState>, transition: Transition) => {
        //         let params = transition.params();
        //         store.dispatch(new LoadAnswerDetailsAction(params['idObservator'], params['idSectie']))
        //     }
        // }]
    },
    {
        name: 'statistics',
        url: '/statistici',
        component: StatisticsComponent
    }
]
