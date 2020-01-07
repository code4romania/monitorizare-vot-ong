import { Observer } from '../../models/observer.model';
import { TemplateRef, Input, Output, EventEmitter } from '@angular/core';

export class BaseObserverCrudComponent {
    @Input() observer: Observer;
    @Input() enableEdit: boolean = false;

    @Output() onSelect: EventEmitter<Partial<Observer>> = new EventEmitter();
    @Output() onDelete: EventEmitter<Observer> = new EventEmitter();
    @Output() onResetPassword: EventEmitter<Observer> = new EventEmitter();

    toggleSelectedState() {
        this.observer.isSelected = !this.observer.isSelected;
        this.onSelect.emit({ id: this.observer.id, isSelected: this.observer.isSelected })
    }


    deleteObserver() {
        if (confirm("Are you sure to delete " + this.observer.name)) {
            this.onDelete.emit(this.observer);
        }
    }

    openResetPasswordModal(): void {
        this.onResetPassword.emit(this.observer);
    }
}