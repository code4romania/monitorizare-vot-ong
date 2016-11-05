import { TokenService } from './token/token.service';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements Interceptor {

    constructor(private tokenService: TokenService) { }

    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        request.options.headers.append('Authorization', `Bearer ${this.tokenService.token}`)

        return request;
    }


}
