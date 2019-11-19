import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Observer } from '../../../models/observer.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';

@Component({
  selector: 'app-observers-card',
  templateUrl: './observers-card.component.html',
  styleUrls: ['./observers-card.component.scss']
})
export class ObserversCardComponent implements OnInit {
  @Input() observer: Observer;
  @Output() onSelect: EventEmitter<Partial<Observer>> = new EventEmitter();
  @Output() onDelete: EventEmitter<Observer> = new EventEmitter();
  @Output() onResetPassword: EventEmitter<{ phone: string, password: string }> = new EventEmitter();
  newPassword = '';
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  toggleSelectedState() {
    this.observer.isSelected = !this.observer.isSelected;
    this.onSelect.emit({ id: this.observer.id, isSelected: this.observer.isSelected })
  }


  deleteObserver() {
    if (confirm("Are you sure to delete " + this.observer.name)) {
      this.onDelete.emit(this.observer);
    }
  }

  resetPassword() {
    this.onResetPassword.emit({ phone: this.observer.phone, password: this.newPassword });
    this.modalRef.hide();
  }

  openResetPasswordModal(template: TemplateRef<any>): void {
    this.newPassword = '';
    this.modalRef = this.modalService.show(template, this.modalOptions);
  }

  isPasswordValid(): boolean {
    if (this.newPassword && this.newPassword.length === 4) {
      return true;
    }

    return false;
  }
}
