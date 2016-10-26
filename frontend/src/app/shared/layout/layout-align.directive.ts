import { DirectiveWithValue } from './directiveWithValue.directive';
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({
    selector:'[layout-align]'
})
export class LayoutAlignDirective extends DirectiveWithValue{

    @Input('layout-align') set layoutAlign(layoutAlign: string) { this.updateElementClass(layoutAlign); }
    constructor(el:ElementRef, render: Renderer){
        super(el,render, 'layout-align');
    }
}