import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports:[HeaderComponent],
  declarations: [HeaderComponent, LogoComponent, MenuComponent]
})
export class HeaderModule { }
