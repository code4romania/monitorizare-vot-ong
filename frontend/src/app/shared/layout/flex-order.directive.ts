import { DirectiveWithValue } from './directiveWithValue.directive';
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({
    selector:'flex-order'
})
export class FlexOrderDirective extends DirectiveWithValue{

    @Input('flex-order') set flexOrder(flexOrder){ this.updateElementClass(flexOrder);}

    constructor(el:ElementRef, render: Renderer){
        super(el,render, 'flex-order');
    }
}