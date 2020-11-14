import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-icon-toggle-input',
  templateUrl: './icon-toggle-input.component.html',
  styleUrls: ['./icon-toggle-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconToggleInputComponent),
      multi: true
    }
  ]
})
export class IconToggleInputComponent implements ControlValueAccessor {

  @Input() value = false;

  @Input() enabledIcon: string;
  @Input() disabledIcon: string;
  @Input() enabledIconTooltip: string;
  @Input() disabledIconTooltip: string;

  onChange = (value: boolean) => {};
  onTouched = () => {};

  constructor() { }

  toggleValue() {
    this.value = !this.value;
    this.onChange(this.value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
}
