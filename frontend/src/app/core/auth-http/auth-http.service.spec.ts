/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthHttpService } from './auth-http.service';

describe('Service: AuthHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttpService]
    });
  });

  it('should ...', inject([AuthHttpService], (service: AuthHttpService) => {
    expect(service).toBeTruthy();
  }));
});
