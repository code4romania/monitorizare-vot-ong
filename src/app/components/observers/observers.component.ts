import { from as observableFrom, Observable, Subscription } from 'rxjs';

import { concatMap, take, map } from 'rxjs/operators';
import { ObserversStateItem } from '../../store/observers/observers.state';
import { AppState } from '../../store/store.module';
import { select, Store } from '@ngrx/store';
import { ApiService } from '../../core/apiService/api.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
  Inject,
  InjectionToken,
} from '@angular/core';
import {
  LoadObserversAction,
  LoadObserversCountAction,
} from '../../store/observers/observers.actions';
import { values } from 'lodash';
import { Observer } from '../../models/observer.model';
import { ListType } from '../../models/list.type.model';
import { ObserversFilterForm } from './observers-filter.form';
import { ObserversService } from '../../services/observers.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { SelectedZoneEvents, TableColumn } from 'src/app/table/table-container/table-container.component';
import { DropdownConfigItem } from 'src/app/shared/base-dropdown/base-dropdown.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

const ACTIONS_COLUMN_NAME = 'Actions';

const TABLE_COLUMNS = new InjectionToken('TABLE_COLUMNS', {
  providedIn: 'root',
  factory: () => {
    const columns: TableColumn[] = [
      { name: 'NAME', propertyName: 'name', },
      { name: 'PHONE', propertyName: 'phone', },
      { name: 'LAST_LOGIN', propertyName: 'lastSeen', canBeSorted: true },
      { name: 'OBSERVER_POLLING_STATIONS', propertyName: 'numberOfPollingStations' },
      { name: 'ACTIONS', propertyName: ACTIONS_COLUMN_NAME },
    ];

    return columns;
  }
});

enum DROPDOWN_EVENTS {
  EDIT,
  DELETE,
  NOTIFICATION
};

type TableColumnTranslated = Omit<TableColumn, 'name'> & { name: Observable<any> }

@Component({
  selector: 'app-observers',
  templateUrl: './observers.component.html',
  styleUrls: ['./observers.component.scss'],
})
export class ObserversComponent implements OnInit, OnDestroy {
  @ViewChild('editObserverModalTemplate') editObserverModal: TemplateRef<any>;

  observersState: ObserversStateItem;
  observersSubscription: Subscription;
  observersCountSubscription: Subscription;
  observersList: Array<Observer>;
  listType: ListType = ListType.CARD;
  observersFilterForm: ObserversFilterForm;
  selectedObserversIds: Array<string> = [];
  listTypes = ListType;
  anyObservers = false;
  pageSize = 9;
  totalCount = 0;

  newPassword = '';
  modalRef: NgbModalRef;
  modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
  };
  observerToEdit: Observer;
  
  actionsColumnName = ACTIONS_COLUMN_NAME;
  dropdownConfig: DropdownConfigItem[] = [
    { name: 'Edit', isMain: true, eventType: DROPDOWN_EVENTS.EDIT  },
    { name: 'Delete', eventType: DROPDOWN_EVENTS.DELETE  },
    { name: 'Notification', eventType: DROPDOWN_EVENTS.NOTIFICATION  },
  ];

  tableColumns: TableColumnTranslated[] = [];

  constructor(
    private http: ApiService,
    private store: Store<AppState>,
    private observersService: ObserversService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(TABLE_COLUMNS) rawTableColumns: TableColumn[],
  ) {
    this.observersFilterForm = new ObserversFilterForm();
    this.translateColumnNames(rawTableColumns);
  }

  ngOnInit() {
    this.loadObservers(1);
    this.handleObserversData();
    this.loadObserversCount();
    this.handleObserversCountData();
  }

  changeListType(type: string) {
    this.listType = type as ListType;
  }

  pageChanged(event) {
    this.loadObservers(event.page);
  }

  applyFilters() {
    this.loadObservers(1);
  }

  resetFilters() {
    this.observersFilterForm.reset({ name: '', phone: '' });
    this.loadObservers(1);
  }

  onSelectedZoneEvent (ev: SelectedZoneEvents) {
    console.warn('TO BE IMPLEMENTED', ev);
  }

  onDropdownEvent (ev: DROPDOWN_EVENTS, row: any) {
    switch (true) {
      case ev === DROPDOWN_EVENTS.EDIT:
        this.router.navigate(['profil/edit/', row.id], { relativeTo: this.route });
        break;
      case ev === DROPDOWN_EVENTS.EDIT:
        console.warn('TO BE IMPLEMENTED');
        break;
      case ev === DROPDOWN_EVENTS.EDIT:
        console.warn('TO BE IMPLEMENTED');
        break;
    }
    
    console.log(ev, row)
  }

  private loadObservers(pageNo) {
    this.store
      .pipe(
        select((s) => s.observers),
        take(1),
        map((data) => values(data)),
        concatMap((s) => observableFrom(s)),
        map(
          (storeItem: ObserversStateItem) =>
            new LoadObserversAction(
              storeItem.key,
              pageNo,
              100,
              true,
              this.observersFilterForm.get('name').value,
              this.observersFilterForm.get('phone').value
            )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private loadObserversCount() {
    this.store
      .pipe(
        select((s) => s.observersCount),
        take(1),
        map((_) => new LoadObserversCountAction())
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleObserversData() {
    this.observersSubscription = this.store
      .select((state) => state.observers)
      .pipe(
        map((state) => values(state)),
        map((state) => state[0])
      )
      .subscribe((state) => {
        this.observersState = state;
        this.observersList = state.values;
        this.anyObservers = state.values.length > 0;
      });
  }
  private handleObserversCountData() {
    this.observersCountSubscription = this.store
      .select((state) => state.observersCount)
      .pipe(map((state) => state.count))
      .subscribe((state) => {
        this.totalCount = state;
      });
  }

  onObserverSelect(selectedObserver: Partial<Observer>) {
    if (selectedObserver.isSelected) {
      this.selectedObserversIds.push(selectedObserver.id);
    } else {
      const index = this.selectedObserversIds.findIndex(
        (observerId) => observerId === selectedObserver.id
      );
      this.selectedObserversIds.splice(index, 1);
    }
  }

  onObserverDelete(observer: Observer) {
    this.observersService.deleteObserver(observer.id).subscribe((_) => {
      this.loadObservers(1);
      this.loadObserversCount();
      this.toastrService.warning('Success!', 'User has been removed');
    });
  }

  onObserverResetPassword(observer: Observer) {
    this.observerToEdit = observer;
    this.newPassword = '';
    this.modalRef = this.modalService.open(
      this.editObserverModal,
      this.modalOptions
    );
  }

  ngOnDestroy() {
    this.observersSubscription.unsubscribe();
    this.observersCountSubscription.unsubscribe();
  }

  isPasswordValid(): boolean {
    return (
      this.newPassword &&
      (this.newPassword.length === 4 || this.newPassword.length === 6)
    );
  }

  resetPassword() {
    this.observersService
      .resetPasswordObserver(this.observerToEdit.phone, this.newPassword)
      .subscribe(
        (_) => {
          this.toastrService.success(
            'Success!',
            'Password has been reset for the observer.'
          );
          this.modalRef.close();
        },
        (_) => {
          this.toastrService.error('Could not reset password', 'Error!');
        }
      );
  }

  private translateColumnNames (rawTableColumns: TableColumn[]) {
    this.tableColumns = rawTableColumns.map(
      ({ name, ...rest }) => ({ ...rest, name: this.translateService.get(name) })
    );
  }
}
