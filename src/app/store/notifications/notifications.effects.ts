import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NotificationsService} from '../../services/notifications.service';
import {NotificationsActions} from './notifications.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationsEffects {
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.LOAD_ACTION),
      mergeMap(({page, pageSize}) => this.notificationsService.getAll(page, pageSize)
        .pipe(
          map(NotificationsActions.loaded),
          catchError(() => NotificationsActions.error)
        ))
    )
  );

  constructor(private actions$: Actions,
              private notificationsService: NotificationsService) {}
}
