import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceUpdatableComponent } from './force-updatable.component';

describe('ForceUpdatableComponent', () => {
  let component: ForceUpdatableComponent;
  let fixture: ComponentFixture<ForceUpdatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceUpdatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceUpdatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
