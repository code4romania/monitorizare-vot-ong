import {HistoryNotifications} from '../../models/notification.model';
import {AppState} from '../store.module';
import {createSelector} from '@ngrx/store';

export interface NotificationsState extends HistoryNotifications {
  loading: boolean;
}

export const notificationsInitialState: NotificationsState = {
  data: [],
  page: 0,
  pageSize: 0,
  totalPages: 0,
  totalItems: 0,
  loading: false
};

export const selectNotifications = (s: AppState) => s.notifications;
export const selectNotificationData = createSelector(selectNotifications, s => s.data);
