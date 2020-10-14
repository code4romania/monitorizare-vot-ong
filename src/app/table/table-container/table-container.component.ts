import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, OnInit, TemplateRef } from '@angular/core';

export interface TableColumn {
  name: string;
  canBeSorted?: boolean;
  propertyName?: string;
}

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

  @ContentChild(TemplateRef) tdContent: TemplateRef<any>;

  selectedRows: { [rowId: string]: boolean } = {};
  allSelected = false;
  nrSelectedRows = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAll () {
    if (!this.allSelected) {
      this.allSelected = true;
      this.selectedRows = {};
      this.nrSelectedRows = this.rows.length;
    } else {
      this.allSelected = false;
      this.nrSelectedRows = 0;
    }
  }

  toggleRow (rowId) {
    this.selectedRows[rowId] = this.allSelected ? false : !this.selectedRows[rowId];

    this.nrSelectedRows += (this.selectedRows[rowId] ? 1 : -1);

    if (!this.nrSelectedRows) {
      this.allSelected = false;
    }
  }
} 