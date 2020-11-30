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
  PURPLE,
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
  @HostBinding('class.is-purple') isPurple = false;

  @Input('custom-styles') customStyles = {};
  @Input('disabled') isDisabled = false;
  @Input('type') type = 'button';
  @Input('has-color-inherited')
  @HostBinding('class.has-color-inherited') hasColorInherited = false;

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
      case v === Variants.PURPLE:
      this.isPurple = true;
      break;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
