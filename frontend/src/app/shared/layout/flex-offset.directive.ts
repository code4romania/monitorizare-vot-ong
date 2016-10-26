import { DirectiveWithValue } from './directiveWithValue.directive';
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({
    selector:'[flex-offset]'
})
export class FlexOffsetDirective extends DirectiveWithValue{

    @Input('flex-offset') set flexOffset(offset: string) { this.updateElementClass(offset); }
    constructor(el:ElementRef, render: Renderer){
        super(el,render, 'flex-offset');
    }
}