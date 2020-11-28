import {actionType} from '../util';
import {createAction, props} from '@ngrx/store';
import {HistoryNotifications} from '../../models/notification.model';

export class NotificationsActions {
  static LOAD_ACTION = actionType('[Notifications] Load');
  static LOADED_ACTION = actionType('[Notifications] Loaded');
  static ERROR_ACTION = actionType('[Notifications] Load Error');

  static load = createAction(NotificationsActions.LOAD_ACTION, props<{page: number, pageSize: number}>());
  static loaded = createAction(NotificationsActions.LOADED_ACTION, props<HistoryNotifications>());
  static error = createAction(NotificationsActions.ERROR_ACTION);
}

