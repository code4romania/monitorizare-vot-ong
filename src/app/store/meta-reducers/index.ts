import { ActionReducer, MetaReducer } from '@ngrx/store';
import { logout } from '../user/user.actions';

const resetStateAfterLogout = (reducer: ActionReducer<any, any>) => (state, action) => {
  return action.type === logout.type ? reducer(undefined, {}) : reducer(state, action);
};

export const metaReducers: MetaReducer[] = [resetStateAfterLogout];