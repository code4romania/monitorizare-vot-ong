import { AnswersComponent } from './components/answers/answers.component';
import { StatisticsDetailsComponent } from './components/statistics-details/statistics-details.component';
import { StatisticsTopComponent } from './components/statistics-top/statistics-top.component';
import { ANSWERS_DETAIL_LOAD, ANSWERS_LIST_LOAD } from './store/answers/answers.actions';
import { AppState } from './store/app.state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ng2StateDeclaration, Transition } from 'ui-router-ng2';


let detaliiStoreResolve = {
    provide: 'dispatchDetails',
    useFactory: (store: Store<AppState>, trans: Transition) => {
        let params = trans.params();
        store.dispatch({
            type: ANSWERS_DETAIL_LOAD,
            payload: {
                observerId: params['idObservator'],
                sectionId: params['idSectie']
            }
        })
    },
    deps: [Store, Transition]
}
let answersListResolve = {
    provide: 'listDispatch',
    useFactory: (store: Store<AppState>, trans: Transition) => {
        store.dispatch({
            type: ANSWERS_LIST_LOAD,
            payload: {
                urgent: new Boolean(trans.params()['urgent']).valueOf()
            }
        })
    },
    deps: [Store, Transition]
}
export let appRoutes: Ng2StateDeclaration[] = [
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
            useFactory: (trans: Transition) => trans.params()['index'],
            deps: [Transition]
        }]
                

    }]