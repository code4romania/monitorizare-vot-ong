import { ChangeDetectionStrategy, Component, HostBinding, InjectionToken, Input, OnInit, ViewEncapsulation } from '@angular/core';

export const BASE_BUTTON_VARIANTS = new InjectionToken('BASE_BUTTON_VARIANTS', {
  providedIn: 'root',
  factory: () => Variants
});

export enum Variants {
  DEFAULT,
  BGYELLOW,
  BGGRAY,
  ALLTRANSPARENT,
};

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonComponent implements OnInit {
  
  @HostBinding('class.is-bg-yellow') isBgYellow = false;
  @HostBinding('class.is-bg-gray') isBgGray = false;
  @HostBinding('class.is-all-transparent') isAllTransparent = false;

  @Input('custom-styles') customStyles = {};

  @Input() set variant (v: Variants) {
    switch(true) {
      case v === Variants.BGYELLOW:
        this.isBgYellow = true;
        break;
      case v === Variants.BGGRAY:
        this.isBgGray = true;
        break;
      case v === Variants.ALLTRANSPARENT:
        this.isAllTransparent = true;
        break;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
