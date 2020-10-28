import { shouldLoadPage } from '../../shared/pagination.service';
import { StatisticsActions, StatisticsActionTypes } from './statistics.actions';
import { statisticsInitialState, StatisticsStateItem } from './statistics.state';
export function statisticsReducer(state = statisticsInitialState, action: StatisticsActionTypes) {

    switch (action.type) {
        case StatisticsActions.LOAD:
        case StatisticsActions.LOADED:
            const reducedItem = statisticsItemReducer(state[action.payload.key], action);
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

export function statisticsItemReducer(state: StatisticsStateItem, action: any) {
    switch (action.type) {
        case StatisticsActions.LOAD:
                const newList = action.payload.refresh,
                shouldLoadList = shouldLoadPage(action.payload.page, action.payload.pageSize, state.values.length);
                return Object.assign({}, state, {
                loading: shouldLoadList,
                error: false,
                page: action.payload.page,
                pageSize: action.payload.pageSize,
                values: newList ? [] : state.values
            });
        case StatisticsActions.LOADED:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                values: state.values.concat(action.payload.items),
                totalPages: action.payload.totalPages,
                totalItems: action.payload.totalItems
            });
        case StatisticsActions.ERROR:
            return Object.assign({}, state, {
                error: true,
                loading: false
            });
        default:
            return state;

    }
}
