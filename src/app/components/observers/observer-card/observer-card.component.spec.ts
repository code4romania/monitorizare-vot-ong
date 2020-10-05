import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverCardComponent } from './observer-card.component';

describe('ObserverCardComponent', () => {
  let component: ObserverCardComponent;
  let fixture: ComponentFixture<ObserverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
