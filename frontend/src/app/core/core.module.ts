import { SharedModule } from '../shared/shared.module';
import { ApiService } from './apiService/api.service';
import { AuthentificationService } from './authentification/authentification.service';
import { TokenService } from './token/token.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';

// import { AuthentificationService } from './authentification/authentification.service';
// import { TokenService } from './token/token.service';
// import { UserService } from './user/user.service';



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
    ApiService,
    // {
    //   provide: Http,
    //   useClass: AuthHttpService,
    //   deps: [XHRBackend, RequestOptions]
    // },
    // AuthGuard
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
