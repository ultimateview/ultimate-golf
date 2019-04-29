import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVideoTime } from 'src/app/shared/services/video/IVideoTime';
import { CourseService } from 'src/app/shared/services/golf/course.service';
import { UtilsService } from 'src/app/shared/services/utilities/utils.service';
import { VideoTimeService } from 'src/app/shared/services/video/video-time.service';
import { GolfCourseObject } from './../../../../golf-objects/golf.planet';
import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';

declare var $: any;

@Component({
  selector: 'app-course-composite',
  templateUrl: './course-composite.component.html',
  styleUrls: ['./course-composite.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCompositeComponent extends ForceUpdatableComponent implements OnInit {
  @Input() courseId: string;
  @Input() areaId: string;

  @Input() currentCourse: GolfCourseObject;
  @Input() courseList: Array<GolfCourseObject>;

  info: object;

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;

  // protected registeredWithWaypoints: Array<any>;

  constructor(private _course: CourseService,
              private _utils: UtilsService,
              private _videoTimeService: VideoTimeService,
              protected _redrawService: RedrawService,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(_redrawService, changeDetectorRef);
    // this.registeredWithWaypoints = new Array();
  }

  setHoleNum(num: any) {
    this.currentCourse.setCurrentHole(num);
    this.info = this.currentCourse.currentHole.recalculateDistances();
    this._redrawService.setUpdatableObservable(this.info);
  }
  setCourse(course: any) {
    //
  }

  ngOnInit() {
    this.startComposite();
    // const t = this;
    // setTimeout(function() {
    //   t.startComposite();
    // }, 100);

    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.videoTime = item);
  }
  startComposite() {
    this.currentCourse.setCurrentHole(1);
    this.info = this.currentCourse.currentHole.recalculateDistances();
  }

}
