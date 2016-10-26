import { DirectiveWithoutValue } from './directiveWithoutValue.directive';
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({
    selector: '[hide]'
})
export class HideDirective extends DirectiveWithoutValue {
    
    constructor(el: ElementRef, render: Renderer) {
        super(el, render, 'hide');
    }
}