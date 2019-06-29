import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-inline-edit-input',
  templateUrl: './inline-edit-input.component.html',
  styleUrls: ['./inline-edit-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditInputComponent),
    multi: true
  }]
})
export class InlineEditInputComponent implements ControlValueAccessor {
  @Input() viewClassNames: string = 'p';
  @ViewChild('inlineEditControl') inlineEditControl: ElementRef;
  private _editMode = false;
  private _disabled = false;
  private _value:string;

  private changed = new Array<(value: string) => void>();
  private touched = new Array<() => void>();

  get value(): string{
    return this._value;
  }

  set value(value: string) {
    if (this._value !== value){
      this._value = value;
      this.changed.forEach(f => f(value));
    }
  }

  onBlur(){
    this._editMode = false;
  }

  startEditing(){
    if (this._disabled){
      return
    }
    this._editMode = true;
    setTimeout(() => {
      console.log('Timeout');
      (this.inlineEditControl.nativeElement as HTMLInputElement).focus();
    })
  }

  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._value = obj;
  }
}
