import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, InjectionToken, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';

export interface TableColumn {
  name: string;
  canBeSorted?: boolean;
  propertyName?: string;
}

export enum SelectedZoneEvents {
  DELETE,
  NOTIFCATION
}

const SELECTED_ZONE_EVENTS = new InjectionToken('SELECTED_ZONE_EVENTS', {
  providedIn: 'root',
  factory: () => SelectedZoneEvents,
});

@Component({
  selector: 'app-table-container[columns]',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() rows: unknown[] = [];
  @Input() idKey = 'id';

  @Output() selectedZoneEvent = new EventEmitter();

  @ContentChild(TemplateRef) tdContent: TemplateRef<any>;
  
  selectedRows: { [rowId: string]: boolean } = {};
  allSelected = false;
  nrSelectedRows = 0;

  constructor(
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,
    @Inject(SELECTED_ZONE_EVENTS) public Events: typeof SelectedZoneEvents
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
      : this.allSelected ? false : true; 

    this.nrSelectedRows += (this.selectedRows[rowId] ? 1 : -1);

    if (!this.nrSelectedRows) {
      this.allSelected = false;
    }
  }

  sendSelectedZoneEvent (ev: SelectedZoneEvents) {
    this.selectedZoneEvent.emit(ev);
    this.clearSelectedRows();
  }

  private clearSelectedRows () {
    this.allSelected = false;
    this.nrSelectedRows = 0;
    this.selectedRows = {};
  }
} 