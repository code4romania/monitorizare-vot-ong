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
  @Output() onDelete: EventEmitter<Observer> = new EventEmitter();
  @Output() onResetPassword: EventEmitter<Observer> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleSelectedState() {
    this.observer.isSelected = !this.observer.isSelected;
    this.onSelect.emit({id: this.observer.id, isSelected: this.observer.isSelected})
  }


  deleteObserver() {
    this.onDelete.emit(this.observer);
  }

  resetPassword() {
    this.onResetPassword.emit(this.observer);
  }

}
