import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utilities/utils.service';
import { CourseService } from './../../../shared/services/golf/course.service';

declare var videojs: any;
declare var $: any;

@Component({
  selector: 'app-vjs',
  templateUrl: './vjs.component.html',
  styleUrls: ['./vjs.component.css']
})
export class VjsComponent implements OnInit {

  @Input() videoId: string;
  @Input() videoTitle: string;
  @Input() videoUrl: string;
  @Input() videoWidth: number;
  @Input() videoHeight: number;
  @Input() videoType: string;
  @Input() videoAutoPlay: string;
  w; p; vr;

  video: any;
  videoPercent = 0.0;
  videoYardsTraveled = 0.0;
  videoYardsTotal = 0.0;
  videoYardsOut = 0.0;
  videoYardClosestIndex = 0;

  info: object;

  childMapCenterMethod: any;
  registeredMarkers: any;

  // @Input() courseMapCenterFunction: any;
  @Output() videoJumped: EventEmitter<any> = new EventEmitter();

  constructor(private _course: CourseService, private _utils: UtilsService) { }

  ngOnInit() {
    this.info = this._course.getHoleDataByCourseAndHoldId('course1', 'hold1');
    const t = this;
    setTimeout(function() {
      t.video = $('#' + t.videoId).get(0);
      t.w = window;
      t.p = t.w.player = videojs(t.videoId);
      t.p.mediainfo = t.p.mediainfo || {};
      t.p.mediainfo.projection = '360';
      t.vr = t.w.vr = t.p.vr({projection: 'AUTO', debug: true, forceCardboard: false});
      // t.videoYardsTotal = t.info.poi[0].gps.distance;
      t.timeUpdate();
    }, 100);
  }

  announceVideoHookCatch(evt) {
    this.childMapCenterMethod = evt.centerMethod;
    this.registeredMarkers = evt.markerList;
    console.log(this.registeredMarkers);
  }

  videoJump(idx: number) {
    const jumpTime = (this.info['poi'][0].gps.distance - this.info['poi'][idx].gps.distance) / this.videoYardsTotal * this.video.duration;
    // console.log(jumpTime);
    if ( (jumpTime >= 0) && (jumpTime <= this.video.duration) ) {
      this.video.currentTime = jumpTime;
      this.videoJumped.emit({ markerIndex: idx});
      if (this.childMapCenterMethod) {
        this.childMapCenterMethod(idx);
      }
      // this.registeredMarkers[idx].click();
    }
    return false;
  }

  timeUpdate() {
    this.videoPercent = this.video.currentTime ? (this.video.currentTime / this.video.duration) : 0;

    this.videoYardsTraveled = this.video.currentTime ? (this.videoPercent * this.info['poi'][0].gps.distance) : 0;
    this.videoYardsTotal = this.info['poi'][0].gps.distance;
    this.videoYardsOut = this.videoYardsTotal - this.videoYardsTraveled;
    this.videoYardClosestIndex = this.closestIndexFrom(this.videoYardsOut);
  }
  closestIndexFrom(yardsOut) {
    let idx = 0;
    let tmpDistance = 99999.99;
    if (this.info && this.info['poi']) {
      for (let i = 0; i < this.info['poi'].length; i++) {
        // loop through POIs looking for closest to current videoYards
        if (Math.abs(this.videoYardsOut - this.info['poi'][i].gps.distance) < tmpDistance) {
          tmpDistance = Math.abs(this.videoYardsOut - this.info['poi'][i].gps.distance);
          idx = i;
        }
      }
    }
    return idx;
  }
  inlineAttributes() {
    const s = (this.videoAutoPlay === 'yes' ? 'autoplay' : '');
    return s;
  }
}
