import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoTimeService } from 'src/app/shared/services/video/video-time.service';
import { IVideoTime } from 'src/app/shared/services/video/IVideoTime';
import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';


@Component({
  selector: 'app-waypoint-select',
  templateUrl: './waypoint-select.component.html',
  styleUrls: ['./waypoint-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaypointSelectComponent extends ForceUpdatableComponent implements OnInit {

  @Input() info: object;
  infoObjectSubscription: Subscription;
  // @Output() registerAsChild: EventEmitter<any> = new EventEmitter();
  // @Output() waypointJumpEvent: EventEmitter<any> = new EventEmitter();

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;

  currentWaypointIndex = 0;

  constructor(protected changeDetectorRef: ChangeDetectorRef,
              protected _videoTimeService: VideoTimeService,
              protected _redrawService: RedrawService) {
    super(_redrawService, changeDetectorRef);
  }

  ngOnInit() {
    // const evtPayload = { purpose: 'register with composite', child: this };
    // this.registerAsChild.emit(evtPayload);
    // this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.videoTime = item);
    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.updateFromVideoTime(item));
    this.infoObjectSubscription = this._redrawService.lastInfoObject$.subscribe(item => this.info = item);
  }

  updateFromVideoTime(item) {
    this.videoTime = item;
    // this.currentWaypointIndex = item.videoYardsClosestIndex;
    this.setWaypointIndex(item.videoYardsClosestIndex);
  }

  waypointJump(idx) {
    // this.waypointJumpEvent.emit({index: idx});
  }

  setWaypointIndex(idx) {
    this.deltaDetection(idx);
  }
  deltaDetection(idx) {
    this.changeDetectorRef.markForCheck();
    this.currentWaypointIndex = idx;
    this.changeDetectorRef.detectChanges();
  }

}
