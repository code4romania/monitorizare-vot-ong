import { ElementRef, Renderer } from '@angular/core';
export class DirectiveWithValue {


    private oldValue: string;

    protected updateElementClass(newValue) {
        if (this.oldValue) {
            this.render.setElementClass(this.el.nativeElement, `${this.className}-${this.oldValue.replace(' ','-')}`, false);
        }
        this.render.setElementClass(this.el.nativeElement, `${this.className}-${newValue.replace(' ','-')}`, true);
        this.oldValue = newValue;
    }

    constructor(private el: ElementRef, private render: Renderer, private className: string) {

    }
}