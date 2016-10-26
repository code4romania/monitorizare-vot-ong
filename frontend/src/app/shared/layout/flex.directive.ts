import { DirectiveWithValue } from './directiveWithValue.directive';
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({
    selector: '[flex]'
})
export class FlexDirective extends DirectiveWithValue {

    @Input() set flex(flex: string) { this.updateElementClass(flex); }
    constructor(el: ElementRef, render: Renderer) {
        super(el, render, 'flex');
    }
}