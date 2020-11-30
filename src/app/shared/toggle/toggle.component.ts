import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseCheckboxComponent } from '../base-checkbox/base-checkbox.component';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [ CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent extends BaseCheckboxComponent {
  constructor(detector: ChangeDetectorRef) {
    super(detector);
  }
}
