import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observer} from '../../../models/observer.model';
@Component({
  selector: 'app-observer-tile',
  templateUrl: './observer-tile.component.html',
  styleUrls: ['./observer-tile.component.scss']
})
export class ObserverTileComponent {
  @Input() observer: Observer;
  @Output() onSelect: EventEmitter<Partial<Observer>> = new EventEmitter();

  constructor() {
  }

  toggleSelectedState() {
    this.observer.isSelected = !this.observer.isSelected;
    this.onSelect.emit({id: this.observer.id, isSelected: this.observer.isSelected})
  }
}
