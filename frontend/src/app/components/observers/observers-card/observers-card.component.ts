import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Observer} from '../../../models/observer.model';

@Component({
  selector: 'app-observers-card',
  templateUrl: './observers-card.component.html',
  styleUrls: ['./observers-card.component.scss']
})
export class ObserversCardComponent implements OnInit {
  @Input() observer: Observer;
  @Output() onSelect: EventEmitter<Partial<Observer>> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log("Observer info", this.observer);
  }

  toggleSelectedState(){
    this.observer.isSelected = !this.observer.isSelected;
    this.onSelect.emit({id: this.observer.id, isSelected: this.observer.isSelected})
  }

}
