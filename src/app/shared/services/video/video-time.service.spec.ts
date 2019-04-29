import { TestBed } from '@angular/core/testing';

import { VideoTimeService } from './video-time.service';

describe('VideoTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoTimeService = TestBed.get(VideoTimeService);
    expect(service).toBeTruthy();
  });
});
