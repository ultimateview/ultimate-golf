import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';
import { GolfCourseObject } from 'src/app/golf-objects/golf.planet';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSelectComponent extends ForceUpdatableComponent implements OnInit {

  @Input() courseSelectHandle: any;
  @Input() currentCourse: GolfCourseObject;
  @Input() courseList: Array<GolfCourseObject>;

  constructor(protected _redrawService: RedrawService, protected changeDetectorRef: ChangeDetectorRef) {
    super(_redrawService, changeDetectorRef);
  }

  ngOnInit() {
  }

}
