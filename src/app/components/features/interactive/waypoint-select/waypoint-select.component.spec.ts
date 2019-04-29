import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointSelectComponent } from './waypoint-select.component';

describe('WaypointSelectComponent', () => {
  let component: WaypointSelectComponent;
  let fixture: ComponentFixture<WaypointSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaypointSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
