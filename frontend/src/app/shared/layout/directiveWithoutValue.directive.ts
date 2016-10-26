import { ElementRef, Renderer } from '@angular/core';
export class DirectiveWithoutValue {

    className: string;

    constructor(private el: ElementRef, private render: Renderer, className: string) {
        render.setElementClass(el.nativeElement, className, true);
    }
}