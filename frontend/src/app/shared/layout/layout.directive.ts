import { DirectiveWithValue } from './directiveWithValue.directive';
import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer } from '@angular/core';
@Directive({
    selector: '[layout]'
})
export class LayoutDirective extends DirectiveWithValue {


    @Input() set layout(layout: string) { this.updateElementClass(layout); }

    constructor(el: ElementRef, render: Renderer) {
        super(el,render, 'layout');
     }


}