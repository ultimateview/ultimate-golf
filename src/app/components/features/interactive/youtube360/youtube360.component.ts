import { IVideoTime } from './../../../../shared/services/video/IVideoTime';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// import reframe from 'reframe.js';
import {Subscription, Observable} from 'rxjs';

import { VideoTimeService } from './../../../../shared/services/video/video-time.service';

declare var YT: any;
declare var $: any;

@Component({
  selector: 'app-youtube360',
  templateUrl: './youtube360.component.html',
  styleUrls: ['./youtube360.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Youtube360Component implements OnInit {

  @Input() youtubeId: string;
  @Input() playerId: string;

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;

  videoPercent = 0.0;
  videoYardsTraveled = 0.0;
  videoYardsTotal = 0.0;
  videoYardsOut = 0.0;
  videoYardClosestIndex = 0;
  @Input() info: object;
  status: string;

  videoObserver: any;

  tag = document.createElement('script');
  player: any;
  YT: any;

  // video: any;
  // reframed: Boolean = false;

  protected timeTrackingIntervalRef;
  protected lastCurrentTime = 0;
  @Output() youtubePlayerStateChanged: EventEmitter<any> = new EventEmitter();
  @Output() registerAsChild: EventEmitter<any> = new EventEmitter();

  currentWaypointIndex = 0;

  constructor(protected changeDetectorRef: ChangeDetectorRef, protected _videoTimeService: VideoTimeService) {
    this.tag.src = '//www.youtube.com/iframe_api';
  }

  init() {
    const tag = document.createElement('script');
    tag.src = '//www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  setWaypointIndex(idx) {
    this.deltaDetection(idx);
  }
  deltaDetection(idx) {
    this.changeDetectorRef.markForCheck();
    this.currentWaypointIndex = idx;
    this.changeDetectorRef.detectChanges();
  }
  timeUpdate() {
    if (this.player && this.player.getCurrentTime) {
      this.videoPercent = this.player.getCurrentTime() ? (this.player.getCurrentTime() / this.player.getDuration()) : 0;
      this.videoYardsTraveled = this.player.getCurrentTime() ? (this.videoPercent * this.info['poi'][0].gps.distance) : 0;
      this.videoYardsTotal = this.info['poi'][0].gps.distance;
      this.videoYardsOut = this.videoYardsTotal - this.videoYardsTraveled;
      this.videoYardClosestIndex = this.closestIndexFrom(this.videoYardsOut);
      const updateWith = {
        currentTime: this.player.getCurrentTime(),
        duration: this.player.getDuration(),
        percent: this.videoPercent,
        videoYardsTotal: this.videoYardsTotal,
        videoYardsTraveled: this.videoYardsTraveled,
        videoYardsOut: this.videoYardsOut,
        videoYardsClosestIndex: this.videoYardClosestIndex,
        status: this.status
      };

      this._videoTimeService.changeVideoTime(updateWith);
    }

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

  ngOnInit() {
    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.videoTime = item);

    this.init();
    const t = this;
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      // this.reframed = false;
      this.player = new window['YT'].Player(this.playerId, {
        videoId: this.youtubeId,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            // if (!this.reframed) {
            //   this.reframed = true;
            //   // reframe(e.target.a);
            // }
          }
        }
      });
      $('iframe').addClass('embed-responsive-item');
      this.timeTrackingIntervalRef = setInterval(function() {
        t.timeUpdate();
      }, 100);
    };

    // const evtPayload = { purpose: 'register with composite', child: this };
    // this.registerAsChild.emit(evtPayload);
  }

  onPlayerStateChange(event) {
    // console.log(event);
    const evtPayload = {
      currentTime: this.player.getCurrentTime(),
      duration: this.player.getDuration(),
      playerState: window['YT'].PlayerState,
      status: 'ready'
    };

    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          // console.log('started ' + this.cleanTime());
          evtPayload['status'] = 'started';
        } else {
          // console.log('playing ' + this.cleanTime());
          evtPayload['status'] = 'playing';
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          // console.log('paused' + ' @ ' + this.cleanTime());
          evtPayload['status'] = 'paused';
        }
        break;
      case window['YT'].PlayerState.ENDED:
        // console.log('ended ');
        evtPayload['status'] = 'ended';
        break;
    }
    this.status = evtPayload.status;
    // this.youtubePlayerStateChanged.emit(evtPayload);

    // this._videoTimeService.changeVideoTime({
    //   currentTime: this.player.getCurrentTime(),
    //   duration: this.player.getDuration(),
    //   percent: this.player.getCurrentTime() / this.player.getDuration(),
    //   status: this.status,
    //   videoYardsTotal: this.info['totalDistanceAlongPath'],
    //   videoYardsClosestIndex: 0,
    //   videoYardsOut: 0,
    //   videoYardsTraveled: 0
    // });
    // console.log('NOTE FOR JEFF: Reminder, the yardsClosestIndex, yardsOut, and video ' +
    //           'yardsTraveled needs to be updated by youtube360.component. ');
    // Nevermind (I think). I set the interval to keep everything updated.
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('error in yt360-component' + this.youtubeId);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

}
