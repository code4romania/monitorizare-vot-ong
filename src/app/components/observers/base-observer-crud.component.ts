import { Observer } from '../../models/observer.model';
import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class BaseObserverCrudComponent {
    @Input() observer: Observer;
    @Input() enableEdit = false;
    @Input() selectionEnabled = false;

    @Output() onSelect: EventEmitter<Partial<Observer>> = new EventEmitter();
    @Output() onDelete: EventEmitter<Observer> = new EventEmitter();
    @Output() onResetPassword: EventEmitter<Observer> = new EventEmitter();

    toggleSelectedState() {
        if (this.selectionEnabled) {
            this.observer.isSelected = !this.observer.isSelected;
            this.onSelect.emit({ id: this.observer.id, isSelected: this.observer.isSelected });
        }
    }


    deleteObserver() {
        if (confirm(`Are you sure to delete ${this.observer.name}`)) {
            this.onDelete.emit(this.observer);
        }
    }

    openResetPasswordModal(): void {
        this.onResetPassword.emit(this.observer);
    }
}
