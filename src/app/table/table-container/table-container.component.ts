import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';

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

  constructor(@Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants,) { }

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