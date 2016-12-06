import { LabelValueModel } from '../../../models/labelValue.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {

  @Input()
  statistics:LabelValueModel[];

  constructor() { }

  ngOnInit() {
  }

}
