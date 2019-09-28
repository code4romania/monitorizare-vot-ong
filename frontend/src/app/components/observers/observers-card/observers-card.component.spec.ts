import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserversCardComponent } from './observers-card.component';

describe('ObserversCardComponent', () => {
  let component: ObserversCardComponent;
  let fixture: ComponentFixture<ObserversCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserversCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserversCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
