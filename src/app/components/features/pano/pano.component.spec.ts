import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanoComponent } from './pano.component';

describe('PanoComponent', () => {
  let component: PanoComponent;
  let fixture: ComponentFixture<PanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
