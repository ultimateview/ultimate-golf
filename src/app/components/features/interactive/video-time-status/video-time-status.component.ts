import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { IVideoTime } from 'src/app/shared/services/video/IVideoTime';
import { VideoTimeService } from 'src/app/shared/services/video/video-time.service';

@Component({
  selector: 'app-video-time-status',
  templateUrl: './video-time-status.component.html',
  styleUrls: ['./video-time-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoTimeStatusComponent implements OnInit {

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;
  private _videoTimeSubject: BehaviorSubject<IVideoTime>;

  public get styleWidth(): number {
    // return 'width:' + Math.ceil(this.videoTime.percent * 100.0) + '%';
    return Math.ceil(this.videoTime.percent * 100.0);
  }

  constructor(protected _videoTimeService: VideoTimeService, protected _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.videoTime = item);
    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.deltaDetection(item));
    // make local videoTime observable and call deltaDetection as needed...
    // this._videoTimeSubject = new BehaviorSubject<IVideoTime>(this.videoTime);
    // this._videoTimeSubject.subscribe(item => this.deltaDetection(item));

  }
  deltaDetection(item) {
    this.videoTime = item;
    this._changeDetectorRef.markForCheck();
    // this._currentWaypointIndex = idx;
    this._changeDetectorRef.detectChanges();
  }

}
