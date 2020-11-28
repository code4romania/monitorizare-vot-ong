import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumn]'
})
export class TableColumnDirective {
  constructor (public templateRef: TemplateRef<any>) { }
}
