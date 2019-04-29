import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Youtube360Component } from './youtube360.component';

describe('Youtube360Component', () => {
  let component: Youtube360Component;
  let fixture: ComponentFixture<Youtube360Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Youtube360Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Youtube360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
