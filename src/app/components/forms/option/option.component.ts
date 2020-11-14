import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})

export class OptionComponent {
  @Input() optionFormGroup: FormGroup;

  @Output() optionDeleteEventEmitter = new EventEmitter<any>();

  constructor() { }
}
