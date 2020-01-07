import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { BaseObserverCrudComponent } from '../base-observer-crud.component';

@Component({
  selector: 'app-observers-card',
  templateUrl: './observer-card.component.html',
  styleUrls: ['./observer-card.component.scss']
})
export class ObserverCardComponent extends BaseObserverCrudComponent {

}
