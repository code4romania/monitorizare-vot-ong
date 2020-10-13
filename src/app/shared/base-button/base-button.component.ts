import { Component, HostBinding, InjectionToken, Input, OnInit } from '@angular/core';

export const BASE_BUTTON_VARIANTS = new InjectionToken('BASE_BUTTON_VARIANTS', {
  providedIn: 'root',
  factory: () => Variants
});

export enum Variants {
  DEFAULT,
  BGYELLOW
};

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss']
})
export class BaseButtonComponent implements OnInit {
  
  @HostBinding('class.is-bg-yellow') isBgYellow = false;;

  @Input() set variant (v: Variants) {
    if (v === Variants.BGYELLOW) {
      this.isBgYellow = true;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
