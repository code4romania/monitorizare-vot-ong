import { ApiService } from './api.service';
import { inject, TestBed } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */


describe('Service: AuthHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService]
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
