import { DirectiveWithoutValue } from './directiveWithoutValue.directive';
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[show]'
})
export class ShowDirective extends DirectiveWithoutValue {
    constructor(el: ElementRef, render: Renderer) {
        super(el, render, 'show');
    }
}