import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverImportComponent } from './observer-import.component';

describe('ObserverImportComponent', () => {
  let component: ObserverImportComponent;
  let fixture: ComponentFixture<ObserverImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
