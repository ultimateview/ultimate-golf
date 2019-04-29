import { TestBed } from '@angular/core/testing';

import { GolfcourseService } from './golfcourse.service';

describe('GolfcourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GolfcourseService = TestBed.get(GolfcourseService);
    expect(service).toBeTruthy();
  });
});
