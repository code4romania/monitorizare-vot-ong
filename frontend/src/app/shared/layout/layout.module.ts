import { ShowDirective } from './show.directive';
import { LayoutPaddingDirective } from './layout-padding.directive';
import { LayoutMarginDirective } from './layout-margin.directive';
import { LayoutAlignDirective } from './layout-align.directive';
import { HideDirective } from './hide.directive';
import { FlexDirective } from './flex.directive';
import { FlexOffsetDirective } from './flex-offset.directive';
import { LayoutDirective } from './layout.directive';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [LayoutDirective, FlexOffsetDirective, FlexDirective, HideDirective, LayoutAlignDirective, LayoutMarginDirective, LayoutPaddingDirective, ShowDirective],
    exports: [LayoutDirective, FlexOffsetDirective, FlexDirective, HideDirective, LayoutAlignDirective, LayoutMarginDirective, LayoutPaddingDirective, ShowDirective]
})
export class LayoutModule {

}