import { DirectiveWithoutValue } from './directiveWithoutValue.directive';
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[layout-margin]'
})
export class LayoutMarginDirective extends DirectiveWithoutValue {
    constructor(el: ElementRef, render: Renderer) {
        super(el, render, 'layout-margin');
    }
}