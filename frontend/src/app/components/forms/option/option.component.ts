import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseAnswer} from '../../../models/base.answer.model';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})

export class OptionComponent {
  @Input() currentOption: BaseAnswer;

  @Output() optionDeleteEventEmitter = new EventEmitter<any>();

  constructor() { }

  toggleTextField() {
    this.currentOption.isFreeText = !this.currentOption.isFreeText;
  }
}
