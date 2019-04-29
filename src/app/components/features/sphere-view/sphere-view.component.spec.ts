import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SphereViewComponent } from './sphere-view.component';

describe('SphereViewComponent', () => {
  let component: SphereViewComponent;
  let fixture: ComponentFixture<SphereViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SphereViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SphereViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
