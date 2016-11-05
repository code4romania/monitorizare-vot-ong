import { AuthInterceptor } from './auth-interceptor.service';
import { TokenService } from './token/token.service';
import { InterceptorService } from 'ng2-interceptors';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

// import { AuthentificationService } from './authentification/authentification.service';
// import { TokenService } from './token/token.service';
// import { UserService } from './user/user.service';

import { NgModule, Optional, SkipSelf } from '@angular/core';

// import { CustomHttp } from './custom-http/custom-http.service';


@NgModule({
  imports: [
    HttpModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    AuthInterceptor,
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, authInterceptor : AuthInterceptor) => {
        debugger;
        let service = new InterceptorService(xhrBackend, requestOptions);
        service.addInterceptor(authInterceptor);
        return service;
      },
      deps: [XHRBackend, RequestOptions, AuthInterceptor]
    },
    TokenService,
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
