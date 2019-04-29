import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompositeComponent } from './course-composite.component';

describe('CourseCompositeComponent', () => {
  let component: CourseCompositeComponent;
  let fixture: ComponentFixture<CourseCompositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCompositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCompositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
