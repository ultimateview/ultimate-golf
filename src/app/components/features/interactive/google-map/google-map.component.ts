import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoTimeService } from 'src/app/shared/services/video/video-time.service';
import { IVideoTime } from 'src/app/shared/services/video/IVideoTime';
import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';
// import googlemaps as google from '@google/maps';

declare var $: any;
declare var THREE: any;
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleMapComponent extends ForceUpdatableComponent implements OnInit {
  [x: string]: any;

  @Input() info: object;
  infoObjectSubscription: Subscription;

  @ViewChild('map') mapElement: any;
  // map: google.maps.Map;
  map: any;

  videoTimeSubscription: Subscription;
  videoTimeWatcher: any;
  videoTime: IVideoTime;

  protected hasInit = false;
  protected hasInitInterval;
  currentWaypointIndex = 0;

  markerObjList: Array<any>;

  // @Output() registerAsChild: EventEmitter<any> = new EventEmitter();

  constructor(protected changeDetectorRef: ChangeDetectorRef,
              protected _videoTimeService: VideoTimeService,
              protected _redrawService: RedrawService) {
                super(_redrawService, changeDetectorRef);
              }

  ngOnInit() {
    const t = this;
    this.hasInitInterval = setInterval(function() {
      if (t && t.info) {
        t.hasInit = true;
        t.init();
        clearInterval(t.hasInitInterval);
      }
    }, 100);
    // const evtPayload = { purpose: 'register with composite', child: this };
    // this.registerAsChild.emit(evtPayload);
    this.videoTimeSubscription = this._videoTimeService.videoTimeItem$.subscribe(item => this.updateFromVideoTime(item));
    this.infoObjectSubscription = this._redrawService.lastInfoObject$.subscribe(item => this.infoDetection(item));
  }

  updateFromVideoTime(item) {
    if (item && this.markerObjList) {
      this.videoTime = item;
      // this.currentWaypointIndex = item.videoYardsClosestIndex;
      if (item.videoYardsClosestIndex >= 0) {
        $(this.markerObjList[item.videoYardsClosestIndex]).click();
        this.setWaypointIndex(item.videoYardsClosestIndex);
      }
    }
  }

  setWaypointIndex(idx) {
    this.deltaDetection(idx);
  }
  deltaDetection(idx) {
    this.changeDetectorRef.markForCheck();
    this.currentWaypointIndex = idx;
    this.changeDetectorRef.detectChanges();
  }
  infoDetection(item) {
    this.changeDetectorRef.markForCheck();
    this.info = item;
    this.init();
    this.changeDetectorRef.detectChanges();
  }

  init() {
    if (!this.info || !this.info['poi']) { return false; }

    const mapProperties = {
      center: new google.maps.LatLng(this.info['poi'][0].gps.lat, this.info['poi'][0].gps.lng),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    // t.mapRef = t.map;
    let tmp;

    const iconBase = 'assets/golf/icons/';
    const icons = {
      tee: {
        icon: iconBase + 'tee-sm.png'
      },
      poi: {
        icon: iconBase + 'marker-generic-white-short.png'
      },
      green: {
        icon: iconBase + 'poi-marker.png'
      },
      pin: {
        icon: iconBase + 'flag-sm.png'
      }
    };


    this.markerObjList = [];
    if (this.info && this.info['poi']) {
      for (let i = 0; i < this.info['poi'].length; i++) {
        // console.log(t.info['poi'][i]);
        let tmpType = 'poi';
        if (i === 0) {
          tmpType = 'tee';
        } else if (i === this.info['poi'].length - 2) {
          tmpType = 'green';
        } else if (i === this.info['poi'].length - 1) {
          tmpType = 'pin';
        }
        tmp = new google.maps.Marker({
          title: this.info['poi'][i].title,
          iconZZ: icons[tmpType].icon,
          position: {
            lat: this.info['poi'][i].gps.lat,
            lng: this.info['poi'][i].gps.lng
        }});
        tmp.addListener('click', this.markerClicked);
        tmp.setMap(this.map);
        this.markerObjList.push(tmp);
      }
      // console.log(this.markerObjList);
      this.map.addListener('click', this.mapClicked);
      // const announceObj = {message: 'course-map is ready', mapReference: this.map,
      //                      markerList: markerObjList};
      // console.log('announcing from course-map onInit(): ');
      // console.log(announceObj);
      // t.announceVideoHook.emit( announceObj );
    }
  }

  mapClicked(e) {
    // console.log(e);
  }
  markerClicked(e) {
    // console.log('pos: ');
    // console.log(e);
    this.map.setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()});
    const gmi = e.va.path[1];
    const look = '[data-index="' + $(gmi).attr('id').replace('gmimap', '') + '"] a';
    // console.log(look);
    const $navItem = $(gmi).closest('.card').find(look);
    // console.log($navItem);
    $navItem.get(0).click();
  }

}
