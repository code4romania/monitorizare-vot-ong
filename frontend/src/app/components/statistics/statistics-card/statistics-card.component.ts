import { StatisticsStateItem } from '../../../store/statistics/statistics.state';
import { Observable } from 'rxjs/Rx';
import { LabelValueModel } from '../../../models/labelValue.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {

  @Input()
  item: StatisticsStateItem


  get itemValues(){
    if(!this.item.values){
      return []
    }
    return this.item.values.slice(0,5)
  }


  constructor() { }

  ngOnInit() {

  }

}
