import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('yes');
      this.bsModalRef.hide();
    }
  }

  decline() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('no');
      this.bsModalRef.hide();
    }
  }

}
