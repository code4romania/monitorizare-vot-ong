import {NotificationsActions} from './notifications.actions';
import {notificationsInitialState} from './notifications.state';
import {createReducer, on} from '@ngrx/store';
import {HistoryNotifications} from '../../models/notification.model';

export const notificationsReducer = createReducer(
  notificationsInitialState,
  on(NotificationsActions.load, state => ({...state, loading: true})),
  on(NotificationsActions.loaded, (state, newState: HistoryNotifications) => ({...state, ...newState, loading: false})),
  on(NotificationsActions.error, state => ({...state, ...notificationsInitialState, loading: false}))
)
