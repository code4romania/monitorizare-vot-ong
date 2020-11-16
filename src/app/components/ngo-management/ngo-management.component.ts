import { Component, Inject, InjectionToken, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { from as observableFrom, Observable, Subscription } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { NgoModel } from 'src/app/models/ngo.model';
import { NgosService } from 'src/app/services/ngos.service';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { DropdownConfigItem } from 'src/app/shared/base-dropdown/base-dropdown.component';
import { NgosStateItem } from 'src/app/store/ngos/ngos.state';
import { SelectedZoneEvents, SortedColumnEvent, TableColumn } from 'src/app/table/table-container/table-container.component';

import { ListType } from '../../models/list.type.model';
import { AppState } from '../../store/store.module';
import {
  LoadNgosAction
} from '../../store/ngos/ngos.actions';

const ACTIONS_COLUMN_NAME = 'Actions';

const TABLE_COLUMNS = new InjectionToken('TABLE_COLUMNS', {
  providedIn: 'root',
  factory: () => {
    const columns: TableColumn[] = [
      { name: 'NAME', propertyName: 'name', },
      { name: 'SHORTNAME', propertyName: 'shortName' },
      { name: 'ORGANIZER', propertyName: 'organizer' },
      { name: 'IS_ACTIVE', propertyName: 'isActive' },
      { name: 'ACTIONS', propertyName: ACTIONS_COLUMN_NAME },
    ];

    return columns;
  }
});

const DROPDOWN_CONFIG = new InjectionToken('DROPDOWN_CONFIG', {
  providedIn: 'root',
  factory: () => {
    const config = [
      { name: 'Edit', isMain: true, eventType: DropdownEvents.EDIT },
      { name: 'Change organizer flag', eventType: DropdownEvents.CHANGE_ORGANISER_FLAG },
      { name: 'Change active flag', eventType: DropdownEvents.CHANGE_ACTIVE_FLAG },
      { name: 'Delete', eventType: DropdownEvents.DELETE },

    ];

    return config;
  }
})

const DROPDOWN_EVENTS = new InjectionToken('DROPDOWN_EVENTS', {
  providedIn: 'root',
  factory: () => DropdownEvents,
});

enum DropdownEvents {
  EDIT,
  CHANGE_ACTIVE_FLAG,
  CHANGE_ORGANISER_FLAG,
  DELETE
};

type TableColumnTranslated = Omit<TableColumn, 'name'> & { name: Observable<any> }


@Component({
  selector: 'app-ngo-management',
  templateUrl: './ngo-management.component.html',
  styleUrls: ['./ngo-management.component.scss']
})
export class NgoManagementComponent implements OnInit, OnDestroy {
  @ViewChild('editObserverModalTemplate') editObserverModal: TemplateRef<any>;
  @ViewChild('resetPasswordContent') resetPasswordContent: TemplateRef<any>;

  ngosState: NgosStateItem;
  ngosSubscription: Subscription;
  ngosList: Array<NgoModel>;
  listType: ListType = ListType.CARD;
  selectedNgosIds: Array<number> = [];
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
  observerToEdit: NgoModel;

  actionsColumnName = ACTIONS_COLUMN_NAME;
  tableColumns: TableColumnTranslated[] = [];
  crtResetPasswordRow = null;

  constructor(
    private store: Store<AppState>,
    private ngosService: NgosService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(TABLE_COLUMNS) rawTableColumns: TableColumn[],
    @Inject(DROPDOWN_CONFIG) public dropdownConfig: DropdownConfigItem[],
    @Inject(DROPDOWN_EVENTS) public DropDownEvents: typeof DropdownEvents
  ) {
    this.translateColumnNames(rawTableColumns);
  }

  ngOnInit() {
    this.loadNgos();
    this.handleNgosData();
  }

  changeListType(type: string) {
    this.listType = type as ListType;
  }

  onSelectedZoneEvent(ev: SelectedZoneEvents) {
    console.warn('TO BE IMPLEMENTED', ev);
  }

  onDropdownEvent(ev: DropdownEvents, row: NgoModel) {
    switch (ev) {
      case DropdownEvents.EDIT:
        this.router.navigate(['edit/', row.id], { relativeTo: this.route });
        break;
      case DropdownEvents.DELETE:
        this.deleteNgo(row.id);
        break;
      case DropdownEvents.CHANGE_ACTIVE_FLAG:
        this.changeActiveFlag(row.id, row.isActive);
        break;
      case DropdownEvents.CHANGE_ORGANISER_FLAG:
        this.changeOrganizerFlag(row.id, row.organizer);
        break;
    }
  }

  private deleteNgo(id: number){
    if (confirm(this.translateService.instant('CONFIRM_DELETE_NGO'))) {
      this.ngosService.deleteNgo(id).subscribe((_) => {
        this.loadNgos();
        this.toastrService.warning('Success!', this.translateService.instant('NGO_DELETE_SUCCESS'));
      });
    }
  }

  private changeActiveFlag(id: number, value: boolean) {
    this.ngosService.updateActiveFlag(id, !value).subscribe((_) => {
      this.loadNgos();
      this.toastrService.warning('Success!', this.translateService.instant('NGO_ACTIVE_FLAG_UPDATE_SUCCESS'));
    });
  }

  private changeOrganizerFlag(id: number, value: boolean) {
    this.ngosService.updateOrganizerFlag(id, !value).subscribe((_) => {
      this.loadNgos();
      this.toastrService.warning('Success!', this.translateService.instant('NGO_ORG_FLAG_UPDATE_SUCCESS'));
    });
  }

  private loadNgos() {
    this.store
      .pipe(
        select((s) => s.ngos),
        take(1),
        map((data) => values(data)),
        concatMap((s) => observableFrom(s)),
        map(
          (storeItem: NgosStateItem) =>
            new LoadNgosAction(
              storeItem.key,
              true,
            )
        )
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private handleNgosData() {
    this.ngosSubscription = this.store
      .select((state) => state.ngos)
      .pipe(
        map((state) => values(state)),
        map((state) => state[0])
      )
      .subscribe((state) => {
        this.ngosState = state;
        this.ngosList = state.values;
        this.anyObservers = state.values.length > 0;
      });
  }

  ngOnDestroy() {
    this.ngosSubscription.unsubscribe();
  }

  isBooleanValue(value: any): boolean {
    if (typeof value === 'boolean') {
      return true;
    }

    return false;
  }

  getValueOrDefault(value: any, defaultValue: string) {
    if (value === true || value === false || value === 0) {
      return value
    }

    if (value) {
      return value;
    }

    return defaultValue;
  }

  private translateColumnNames(rawTableColumns: TableColumn[]) {
    this.tableColumns = rawTableColumns.map(
      ({ name, ...rest }) => ({ ...rest, name: this.translateService.get(name) })
    );
  }
}
