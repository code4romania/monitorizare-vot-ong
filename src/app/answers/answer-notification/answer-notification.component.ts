import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Observable, of, timer } from 'rxjs';
import { catchError, map, mapTo, pluck, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/services/notifications.service';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { getSpecificThreadByObserver } from 'src/app/store/answer/answer.selectors';
import { AppState } from 'src/app/store/store.module';

@Component({
  selector: 'answer-notification',
  templateUrl: './answer-notification.component.html',
  styleUrls: ['./answer-notification.component.scss']
})
export class AnswerNotificationComponent {
  observerName$ = this.store.select(getSpecificThreadByObserver, +this.route.snapshot.params.idObserver)
    .pipe(
      tap(v => v === void 0 && this.router.navigate(['/answers'], { relativeTo: this.route })),
      pluck('observerName'),
    );
  actionResultMessage$: Observable<string> = of('');

  buttonStyles = {
    fontWeight: 'normal',
    padding: '0.6rem 1rem',
    height: 'auto',
    borderRadius: '4px',
  }

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationsService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }

  onSubmit (values: { title: string, message: string }) {
    this.actionResultMessage$ = this.notificationService.pushNotification({
      ...values,
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      recipients: [this.route.snapshot.params.idObserver]
    }).pipe(
      mapTo('NOTES_SENT_SUCCESS'),
      catchError(err => of('NOTES_SENT_FAILURE')),  
    );

    this.actionResultMessage$ = concat(
      this.actionResultMessage$,
      timer(5000).pipe(mapTo('')),
    );
  }
}
