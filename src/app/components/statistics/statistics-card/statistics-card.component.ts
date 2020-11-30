import { StatisticsStateItem } from '../../../store/statistics/statistics.state';
import { Component, Input, OnInit } from '@angular/core';
import { StatisticsDetailsComponent } from '../statistics-details/statistics-details.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {

  @Input() item: StatisticsStateItem;

  @Input() sliceNumber: number

  @Input() dialog: boolean;


  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }
  get itemValues(){
    if (!this.item.values){
      return [];
    }
    if (this.sliceNumber) {
      return this.item.values.slice(0, this.sliceNumber);
    } else {
      return this.item.values;
    }

  }



  public openDetail(item: StatisticsStateItem): void {
    const modalRef = this.modalService.open(StatisticsDetailsComponent);
    modalRef.componentInstance.item = item;
  }

}
