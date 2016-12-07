import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  page: number
  @Input()
  pageSize: number

  @Input()
  totalItems: number

  @Input()
  nextEnabled = true

  @Output()
  pageChanged: EventEmitter<any> = new EventEmitter();

  startingindex: number;
  endingIndex: number;

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['page'] || changes['pageSize'] || changes['totalItems']) {
      this.startingindex = (this.page - 1) * this.pageSize + 1;
      this.endingIndex = this.startingindex + this.pageSize

      if(this.endingIndex > this.totalItems){
        this.endingIndex = this.totalItems;
      }
    }

  }

  canNextPage() {
    if (this.nextEnabled === false) {
      return false;
    }
    if (this.totalItems !== undefined && this.pageSize * this.page >= this.totalItems) {
      return false;
    }
    return true;
  }
  canPrevPage(){
    if(this.page === 1){
      return false;
    }
    return true;
  }
  nextPage() {
    if (this.canNextPage()) {
      this.pageChanged.emit({
        page: this.page + 1,
        pageSize: this.pageSize
      })
    }
  }
  prevPage() {
    if(this.canPrevPage()){
      this.pageChanged.emit({
        page: this.page - 1,
        pageSize: this.pageSize
      })
    }
  }

}