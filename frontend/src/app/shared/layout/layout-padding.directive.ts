import { DirectiveWithoutValue } from './directiveWithoutValue.directive';
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[layout-padding]'
})
export class LayoutPaddingDirective extends DirectiveWithoutValue {
    constructor(el: ElementRef, render: Renderer) {
        super(el, render, 'layout-padding');
    }
}