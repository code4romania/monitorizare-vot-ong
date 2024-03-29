import {Component, OnInit} from '@angular/core';
import {CountyPollingStationInfo, NotificationsService,} from '../../services/notifications.service';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ObserversService} from '../../services/observers.service';
import {SentGlobalNotificationModel} from '../../models/notification.model';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export interface NotificationsRouteParams extends Params {
  toObserverIds: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  counties: CountyPollingStationInfo[] = [];
  selectedCounties: { code: string; name: string }[] = [];
  filteredObserverIds: string[] = null;
  usingObserverFilters = false;
  usingRouteFilter$: Observable<boolean>;
  notificationForm: FormGroup;
  notificationFormSubmitted = false;
  observerCount: number;
  maxPollingStationNumber: number;

  countyDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'code',
    textField: 'name',
    itemsShowLimit: 10,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  constructor(
    private notificationsService: NotificationsService,
    private observersService: ObserversService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.usingRouteFilter$ = this.route.queryParams.pipe(
      map((params: NotificationsRouteParams) => {
        if (!params.toObserverIds) return false;

        try {
          const toObserverIds = JSON.parse(params.toObserverIds);
          if (toObserverIds.every(id => typeof id === 'number')) {
            this.filteredObserverIds = toObserverIds;
            this.usingObserverFilters = true;
            return true;
          }
        } catch (e) {
          console.log(e);
        }

        return false;
      }),
      tap(usingRouteFilter => {
        if (!usingRouteFilter) this.resetFilter(); // clear filter if route not used
      }));

    // Execute this once, the first time when component is not filtered
    this.usingRouteFilter$
      .pipe(
        filter(usingRouteObserverIds => !usingRouteObserverIds),
        first())
      .subscribe(() => {
        this.notificationsService
          .getCounties()
          .subscribe((res) => (this.counties = res));

        this.observersService.countObservers()
          .subscribe(count => this.observerCount = count);
      });

    this.notificationForm = new FormGroup({
      notificationTitle: new FormControl('', [Validators.required]),
      notificationMessage: new FormControl('', [Validators.required])
    });
  }

  get notificationTitle() {
    return this.notificationForm.get('notificationTitle');
  }

  get notificationMessage() {
    return this.notificationForm.get('notificationMessage');
  }

  submitNotification() {
    // TODO: change channel and from
    this.notificationFormSubmitted = true;
    if (this.notificationForm.valid) {
      const count = this.usingObserverFilters ? this.filteredObserverIds?.length : this.observerCount;
      if (!confirm(this.translate.instant('NOTIFICATION_SEND_CONFIRMATION').replace('%d', count))) {
        return;
      }

      const notification = this.createGlobalNotification();
      if (this.usingObserverFilters) {
        this.notificationsService
          .pushNotification({...notification, recipients: this.filteredObserverIds})
          .subscribe({
            next: result => this.onNotificationSubmitted(),
            error: errorMsg => this.onNotificationError()
          });
      } else {
        this.notificationsService
          .pushNotificationGlobally(notification)
          .subscribe({
            next: result => this.onNotificationSubmitted(),
            error: errorMsg => this.onNotificationError()
          });
      }
    }
  }

  private onNotificationSubmitted() {
    this.notificationFormSubmitted = false;
    this.toastrService.success(this.translate.instant('NOTIFICATION_SENT_SUCCESS'), this.translate.instant('SUCCESS'));
    this.notificationForm.reset();
  }

  private onNotificationError() {
    this.toastrService.error(this.translate.instant('NOTIFICATION_SENT_ERROR'), this.translate.instant('ERROR'));
  }

  private createGlobalNotification(): SentGlobalNotificationModel {
    return {
      channel: 'Firebase',
      from: 'Monitorizare Vot',
      message: this.notificationMessage.value,
      title: this.notificationTitle.value,
    };
  }

  searchForObservers() {
    this.usingObserverFilters = true;

    this.notificationsService
      .getActiveObserversInCounties(this.selectedCounties.map(c => c.code))
      .subscribe((res) => {
        this.filteredObserverIds = res.map(o => o.id);
      });
  }

  goBack() {
    this.location.back();
  }

  resetFilteredObservers() {
    this.filteredObserverIds = null;
  }

  changeCountyFilter() {
    this.resetFilteredObservers();
    if (this.selectedCounties.length) {
      this.usingObserverFilters = true;
      this.maxPollingStationNumber =
        this.counties.find(c => c.code === this.selectedCounties[0].code)?.limit;
    } else {
      this.usingObserverFilters = false;
    }
  }

  resetFilter() {
    this.selectedCounties = [];
    this.changeCountyFilter();
    this.usingObserverFilters = false;
  }
}
