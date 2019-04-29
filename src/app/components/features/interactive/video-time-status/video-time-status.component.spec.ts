import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTimeStatusComponent } from './video-time-status.component';

describe('VideoTimeStatusComponent', () => {
  let component: VideoTimeStatusComponent;
  let fixture: ComponentFixture<VideoTimeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTimeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTimeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
