import { AnswersComponent } from './components/answers/answers.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { ANSWERS_DETAIL_LOAD, ANSWERS_LIST_LOAD } from './store/answers/answers.actions';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { Transition } from 'ui-router-ng2';
import { UIRouterModule } from 'ui-router-ng2/ng2';


export let detaliiStoreResolve = {
    provide: 'dispatchDetails',
    useFactory: dispatchForDetails,
    deps: [Store, Transition]
}
export let answersListResolve = {
    provide: 'listDispatch',
    useFactory: dispatchForList,
    deps: [Store, Transition]
}
export let appStates = [
    {
        name: 'home',
        url: '/',
        redirectTo: { state: 'raspunsuri', params: { urgente: true } }
    }, {
        name: 'raspunsuri',
        url: '/raspunsuri?urgente',
        resolve: [answersListResolve],
        component: AnswersComponent,
    }, {
        name: 'raspunsuri.detalii',
        url: '/detalii/:idObservator/:idSectie',
        resolve: [detaliiStoreResolve]
    }, {
        name: 'statistics',
        url: '/statistici',
        component: StatisticsTopComponent
    }, {
        name: 'statistics.details',
        url: '/:index',
        views: {
            '@': {
                component: StatisticsDetailsComponent,
                bindings: {
                    'index': 'index'
                },
            }
        },
        resolve: [{
            provide: 'index',
            useFactory: getIndexParam,
            deps: [Transition]
        }]


    }]

export function rootStates(states) {
    return UIRouterModule.forRoot({
        states: states
    })
}
export function getIndexParam(trans: Transition) {
    return trans.params()['index'];
}
export function dispatchForList(store: Store<AppState>, trans: Transition) {
    store.dispatch({
        type: ANSWERS_LIST_LOAD,
        payload: {
            urgent: new Boolean(trans.params()['urgent']).valueOf()
        }
    })
}
export function dispatchForDetails(store: Store<AppState>, trans: Transition) {
    let params = trans.params();
    store.dispatch({
        type: ANSWERS_DETAIL_LOAD,
        payload: {
            observerId: params['idObservator'],
            sectionId: params['idSectie']
        }
    })
}
