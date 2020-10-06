import { AnonGuard } from './anon.guard';
import { AuthGuard } from './authGuard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './apiService/api.service';
import { TokenService } from './token/token.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  imports: [
    HttpClientModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    TokenService,
    ApiService,
    AuthGuard,
    AnonGuard
  ],
  declarations: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() private core: CoreModule) {
    if (core) {
      throw new Error(
        'CoreModule was already imported. It cannot be imported twice'
      );
    }
  }
}
