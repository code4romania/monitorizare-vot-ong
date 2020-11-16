import { NgosActions, NgosActionTypes } from './ngos.actions';
import { ngosInitialState, NgosStateItem } from './ngos.state';

export function ngosReducer(state = ngosInitialState, action: NgosActionTypes) {

  switch (action.type) {
    case NgosActions.LOAD:
    case NgosActions.LOADED:
      const reducedItem = ngoItemReducer(state[action.payload.key], action);
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

export function ngoItemReducer(state: NgosStateItem, action: any) {
  switch (action.type) {
    case NgosActions.LOAD:
      const newList = action.payload.refresh;
      return Object.assign({}, state, {
        loading: true,
        error: false,
        values: newList ? [] : state.values
      });
    case NgosActions.LOADED:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        values: state.values.concat(action.payload.items)
      });
    case NgosActions.ERROR:
      return Object.assign({}, state, {
        error: true,
        loading: false
      });
    default:
      return state;
  }
}
