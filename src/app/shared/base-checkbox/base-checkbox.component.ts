import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractValueAccessor } from '../abstract-value-accessor';
export enum CHECKBOX_VARIANTS {
  FILLED,
}

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BaseCheckboxComponent),
  multi: true
};


@Component({
  selector: 'app-base-checkbox',
  templateUrl: './base-checkbox.component.html',
  styleUrls: ['./base-checkbox.component.scss'],
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCheckboxComponent extends AbstractValueAccessor {
  @Input() name: any;
  @Input() label: string = '';
  @Input() readonly = false;

  @Output() checkboxChanged = new EventEmitter();

  @HostListener('click', ['$event'])
  onHostClick (ev: Event) {
    return false;
  }

  checkBoxChanged (checkbox: any): void {
    if(this.readonly){
      return;
    }

    checkbox.checked = !checkbox.checked
    this.checkboxChanged.next()
  }
}
