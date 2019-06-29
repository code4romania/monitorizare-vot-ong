import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-section-card',
  templateUrl: './form-section-card.component.html',
  styleUrls: ['./form-section-card.component.scss']
})
export class FormSectionCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() hasMenu: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
