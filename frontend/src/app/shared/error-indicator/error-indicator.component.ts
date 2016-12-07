import { EventEmitter } from '@angular/common/src/facade/async';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.scss']
})
export class ErrorIndicatorComponent implements OnInit {

  @Output()
  retry = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
