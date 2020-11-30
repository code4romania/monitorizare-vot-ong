import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export abstract class AbstractValueAccessor implements ControlValueAccessor {
  constructor(private detector: ChangeDetectorRef) {
  }
    _value: any = '';
    get value(): any { return this._value; };
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this.detector.markForCheck();
        this.onChange(v);
      }
    }

    writeValue(value: any) {
      this._value = value;
      this.detector.markForCheck();
      this.onChange(value);
    }

    onChange = (_) => {};

    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}