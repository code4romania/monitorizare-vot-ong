import { AuthGuard } from './authGuard/auth.guard';
import { AuthentificationService } from './authentification/authentification.service';
import { AuthHttpService } from './auth-http/auth-http.service';
import { TokenService } from './token/token.service';
import { BaseRequestOptions, ConnectionBackend, Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

// import { AuthentificationService } from './authentification/authentification.service';
// import { TokenService } from './token/token.service';
// import { UserService } from './user/user.service';

import { NgModule, Optional, SkipSelf } from '@angular/core';


@NgModule({
  imports: [
    HttpModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    TokenService,
    AuthentificationService,
    {
      provide: Http,
      useClass: AuthHttpService,
      deps: [XHRBackend, RequestOptions]
    },
    AuthGuard
  ],
  declarations: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() private core: CoreModule) {
    if (core) {
      throw new Error(
        'CoreModule was already imported. It cannot be imported twice'
      )
    }
  }
}
