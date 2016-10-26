import { SharedModule } from '../shared/shared.module';

// import { AuthentificationService } from './authentification/authentification.service';
// import { TokenService } from './token/token.service';
// import { UserService } from './user/user.service';

import { NgModule, Optional, SkipSelf } from '@angular/core';

// import { CustomHttp } from './custom-http/custom-http.service';


@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
  ],
  providers: [
    // AuthentificationService,
    // TokenService,
    // UserService,
    // {
    //   provide: Http,
    //   useFactory: (conn: XHRBackend, req: RequestOptions) => new CustomHttp(conn, req),
    //   deps: [XHRBackend, RequestOptions]
    // }
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
