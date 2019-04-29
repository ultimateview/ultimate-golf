import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleSelectComponent } from './hole-select.component';

describe('HoleSelectComponent', () => {
  let component: HoleSelectComponent;
  let fixture: ComponentFixture<HoleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
