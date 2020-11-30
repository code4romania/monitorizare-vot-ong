import { Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  page: number;
  @Input()
  pageSize: number;

  @Input()
  totalItems: number;

  @Input()
  nextEnabled = true;

  @Output()
  pageChanged: EventEmitter<{  page: number, pageSize: number }> = new EventEmitter();

  @HostBinding('class.is-hidden') isHidden = false;

  startingindex: number;
  endingIndex: number;
  numberOfDynamicButtons = 0;

  constructor() { }

  ngOnInit() {
  }
  
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
      this.numberOfDynamicButtons = Math.ceil(this.totalItems / this.pageSize);
    }

    this.isHidden = this.totalItems === 0;
  }

  canNextPage() {
    if (this.nextEnabled === false) {
      return false;
    }
    return !(this.totalItems !== undefined && this.pageSize * this.page >= this.totalItems);

  }
  canPrevPage(){
    return this.page !== 1;

  }
  nextPage() {
    if (this.canNextPage()) {
      this.pageChanged.emit({
        page: this.page + 1,
        pageSize: this.pageSize
      });
    }
  }
  prevPage() {
    if (this.canPrevPage()){
      this.pageChanged.emit({
        page: this.page - 1,
        pageSize: this.pageSize
      });
    }
  }

  navigateToPage (nextPage) {
    this.pageChanged.emit({
      page: nextPage,
      pageSize: this.pageSize,
    });
  }
}
