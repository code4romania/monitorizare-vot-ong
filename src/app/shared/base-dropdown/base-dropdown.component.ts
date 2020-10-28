import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChildren } from '@angular/core';
import { BASE_BUTTON_VARIANTS, Variants } from '../base-button/base-button.component';

export interface DropdownConfigItem {
  name: string;
  isMain?: boolean;
  eventType: any;
}

@Component({
  selector: 'app-base-dropdown',
  templateUrl: './base-dropdown.component.html',
  styleUrls: ['./base-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseDropdownComponent {
  @Output() dropdownEvent = new EventEmitter();

  @Input() set configArr (cfg: DropdownConfigItem[]) {
    this.mainButton = cfg.find(i => i.isMain === true); 
    this.dropdownItems = cfg.filter(({ isMain }) => !isMain);
  }

  @ContentChild(TemplateRef) btnContent: TemplateRef<any>;

  dropdownItems: DropdownConfigItem[] = [];
  mainButton: DropdownConfigItem;

  constructor(
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants
  ) { }
}
