import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input()
  page: number;

  @Input()
  pageSize = environment.pageSize;

  @Input()
  totalItems: number;

  @Input()
  nextEnabled = true;

  @Output()
  pageChanged: EventEmitter<{  page: number, pageSize: number }> = new EventEmitter();

  @HostBinding('class.is-hidden') isHidden = false;

  startingindex: number;
  endingIndex: number;
  maxPage = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (!(changes.page || changes.pageSize || changes.totalItems)) {
      return;
    }

    this.startingindex = (this.page - 1) * this.pageSize + 1;
    this.endingIndex = this.startingindex + this.pageSize - 1;

    if (this.endingIndex > this.totalItems){
      this.endingIndex = this.totalItems;
    }

    if ((this.totalItems || this.totalItems === 0) && this.pageSize) {
      this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    }

    this.isHidden = this.totalItems === 0;
  }

  navigateToPage (nextPage) {
    this.pageChanged.emit({
      page: nextPage,
      pageSize: this.pageSize,
    });
  }

  range(page, maxPage) {
    const start = Math.max(1, page - 2);
    const end = Math.min(page + 2, maxPage);

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }
}
