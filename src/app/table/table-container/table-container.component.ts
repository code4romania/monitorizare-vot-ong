import {ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, Inject, Input, OnInit, Output} from '@angular/core';
import {BASE_BUTTON_VARIANTS, Variants} from 'src/app/shared/base-button/base-button.component';
import {TableColumnDirective} from '../table-column/table-column.directive';
import {
  SELECTED_ZONE_EVENTS,
  SelectedZoneEvent,
  SelectedZoneEventTypes,
  SORT_DIRECTION,
  SortDirection,
  SortedColumnEvent,
  TableColumn,
  TableColumnTranslated
} from '../table.model';

@Component({
  selector: 'app-table-container[columns]',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent implements OnInit {
  @Input() columns: TableColumn[] | TableColumnTranslated[] = [];
  @Input() rows: unknown[] = [];
  @Input() idKey = 'id';
  @Input('is-loading') isLoading = true;
  @Input('no-rows-message') noRowsMessage = '';

  @Input('disable-checkbox')
  @HostBinding('class.is-checkbox-disabled')
  isCheckboxDisabled = false;

  @Output() selectedZoneEvent = new EventEmitter<SelectedZoneEvent>();
  @Output() sortedColumnClicked = new EventEmitter<SortedColumnEvent>();
  @Output() rowClicked = new EventEmitter();

  @ContentChild(TableColumnDirective) tableColumn: TableColumnDirective;

  selectedRows: { [rowId: string]: boolean } = {};
  allSelected = false;
  nrSelectedRows = 0;
  crtSortDirection: SortDirection = SortDirection.DESC;
  crtSortedColumn: TableColumn;

  constructor(
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(SELECTED_ZONE_EVENTS) public Events: typeof SelectedZoneEventTypes,
    @Inject(SORT_DIRECTION) public sortDirection: typeof SortDirection,
  ) { }

  ngOnInit(): void {
  }

  toggleAll () {
    if (!this.allSelected) {
      this.allSelected = true;
      this.selectedRows = {};
      this.nrSelectedRows = this.rows.length;
    } else {
      this.clearSelectedRows();
    }
  }

  toggleRow (rowId) {
    this.selectedRows[rowId] = typeof this.selectedRows[rowId] === 'boolean'
      ? !this.selectedRows[rowId]
      : !this.allSelected;

    this.nrSelectedRows += (this.selectedRows[rowId] ? 1 : -1);

    if (!this.nrSelectedRows) {
      this.allSelected = false;
    }
  }

  sendSelectedZoneEvent (type: SelectedZoneEventTypes) {
    const selectedRowIds = this.allSelected
      ? this.rows.map(r => r[this.idKey])
      : Object.entries(this.selectedRows).filter(r => r[1]).map(r => r[0]);
    this.selectedZoneEvent.emit({type, selectedRowIds});
    this.clearSelectedRows();
  }

  triggerSortEvent (col: TableColumn) {
    if (!col.canBeSorted) {
      return;
    }

    let nextSortDir;

    if (this.crtSortedColumn !== col) {
      // setting it to `ASC` because it is assumed that all
      // columns are set to `DESC` by default
      nextSortDir = SortDirection.ASC;
      this.crtSortedColumn = col;
    } else {
      nextSortDir = this.crtSortDirection === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
    }

    this.sortedColumnClicked.emit({
      col,
      sortDirection: nextSortDir,
    });

    this.crtSortDirection = nextSortDir;
  }

  private clearSelectedRows () {
    this.allSelected = false;
    this.nrSelectedRows = 0;
    this.selectedRows = {};
  }
}
