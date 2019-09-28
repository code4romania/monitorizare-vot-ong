import {Component, Input, OnInit} from '@angular/core';
import {Observer} from '../../../models/observer.model';

@Component({
  selector: 'app-observers-card',
  templateUrl: './observers-card.component.html',
  styleUrls: ['./observers-card.component.scss']
})
export class ObserversCardComponent implements OnInit {
  @Input() observer: Observer;

  constructor() { }

  ngOnInit() {
    console.log("Observer info", this.observer);
  }

}
