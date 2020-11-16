import { NgoModel } from '../../models/ngo.model';
import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class BaseNgoCrudComponent {
    @Input() ngo: NgoModel;
    @Input() enableEdit = false;
    @Input() selectionEnabled = false;

    @Output() select: EventEmitter<Partial<NgoModel>> = new EventEmitter();
    @Output() delete: EventEmitter<NgoModel> = new EventEmitter();

    toggleSelectedState() {
        if (this.selectionEnabled) {
            this.ngo.isSelected = !this.ngo.isSelected;
            this.select.emit({ id: this.ngo.id, isSelected: this.ngo.isSelected });
        }
    }


    deleteObserver() {
        if (confirm(`Are you sure to delete ${this.ngo.name}`)) {
            this.delete.emit(this.ngo);
        }
    }
}
