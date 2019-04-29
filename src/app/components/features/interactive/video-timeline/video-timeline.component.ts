import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVideoTime } from 'src/app/shared/services/video/IVideoTime';
import { VideoTimeService } from 'src/app/shared/services/video/video-time.service';
import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';

@Component({
  selector: 'app-video-timeline',
  templateUrl: './video-timeline.component.html',
  styleUrls: ['./video-timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoTimelineComponent extends ForceUpdatableComponent implements OnInit {

  @Input() info: object;
  infoObjectSubscription: Subscription;

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;
  videoYardsClosestIndex = 0;

  constructor(protected _videoTimeService: VideoTimeService,
              protected _changeDetectorRef: ChangeDetectorRef,
              protected _redrawService: RedrawService) {
                super(_redrawService, _changeDetectorRef);
              }

  ngOnInit() {
    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.updateFromVideoTime(item));
    this.infoObjectSubscription = this._redrawService.lastInfoObject$.subscribe(item => this.info = item);
  }
  updateFromVideoTime(item) {
    this.deltaDetection(item);
  }

  deltaDetection(item) {
    this.videoTime = item;
    this._changeDetectorRef.markForCheck();
    this.videoYardsClosestIndex = item.videoYardsClosestIndex;
    this._changeDetectorRef.detectChanges();
  }

  styleLeft(idx) {
    const upper = this.info['poi'].length;
    return Math.floor(idx / upper * 100.0) + 5;
  }

}
