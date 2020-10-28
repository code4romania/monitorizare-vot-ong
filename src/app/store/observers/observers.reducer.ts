import {shouldLoadPage} from '../../shared/pagination.service';
import {ObserversActions, ObserversActionTypes} from './observers.actions';
import { observersInitialState, ObserversStateItem, observersCountInitialState } from './observers.state';

export function observersReducer(state = observersInitialState, action: ObserversActionTypes) {

  switch (action.type) {
    case ObserversActions.LOAD:
    case ObserversActions.LOADED:
      const reducedItem = observersItemReducer(state[action.payload.key], action);
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
export function observersCountReducer(state = observersCountInitialState, action: ObserversActionTypes) {
  switch (action.type) {

    case ObserversActions.LOADEDOBSERVERSTOTALCOUNT:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }


}

export function observersItemReducer(state: ObserversStateItem, action: any) {
  switch (action.type) {
    case ObserversActions.LOAD:
      const newList = action.payload.refresh,
        shouldLoadList = shouldLoadPage(action.payload.page, action.payload.pageSize, state.values.length);
      return Object.assign({}, state, {
        loading: shouldLoadList,
        error: false,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        values: newList ? [] : state.values
      });
    case ObserversActions.LOADED:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        values: state.values.concat(action.payload.items),
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems
      });
    case ObserversActions.ERROR:
      return Object.assign({}, state, {
        error: true,
        loading: false
      });
    default:
      return state;
  }
}
