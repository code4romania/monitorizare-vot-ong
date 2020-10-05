import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OberverRowComponent } from './oberver-row.component';

describe('OberverRowComponent', () => {
  let component: OberverRowComponent;
  let fixture: ComponentFixture<OberverRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OberverRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OberverRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
