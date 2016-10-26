/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomHttp } from './custom-http.service';

describe('Service: CustomHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttp]
    });
  });

  it('should ...', inject([CustomHttp], (service: CustomHttp) => {
    expect(service).toBeTruthy();
  }));
});
