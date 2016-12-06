import { actionType } from '../util';
import { StatisticsActions, StatisticsActionTypes } from './statistics.actions';
import { statisticsInitialState, StatisticsState, StatisticsStateItem } from './statistics.state';
export function statisticsReducer(state = statisticsInitialState, action: StatisticsActionTypes) {

    switch (action.type) {
        case StatisticsActions.LOAD:
        case StatisticsActions.LOADED:
            let reducedItem = statisticsItemReducer(state[action.payload.key], action);
            if (reducedItem === state[action.payload.key]) {
                return state;
            }
            return Object.assign({}, state, {
                [action.payload.key]: reducedItem
            });

        default:
            return state;
    }


}

export function statisticsItemReducer(state: StatisticsStateItem, action: StatisticsActionTypes) {
    switch (action.type) {
        case StatisticsActions.LOAD:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                page: action.payload.page,
                pageSize: action.payload.pageSize,
                values: action.payload.refresh ? [] : state.values
            })
        case StatisticsActions.LOADED:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                values: state.values.concat(action.payload.items),
                totalPages: action.payload.totalPages,
                totalItems: action.payload.totalItems
            })
        default:
            return state;

    }
}