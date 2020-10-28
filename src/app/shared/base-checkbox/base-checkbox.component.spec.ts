import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCheckboxComponent } from './base-checkbox.component';

describe('BaseCheckboxComponent', () => {
  let component: BaseCheckboxComponent;
  let fixture: ComponentFixture<BaseCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
