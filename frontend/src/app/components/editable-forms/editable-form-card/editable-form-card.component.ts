import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editable-form-card',
  templateUrl: './editable-form-card.component.html',
  styleUrls: ['./editable-form-card.component.scss']
})
export class EditableFormCardComponent implements OnInit {
  @Input() id: string;
  @Input() description: string;
  @Input() version: number;
  @Input() published: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
