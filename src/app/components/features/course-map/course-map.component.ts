import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import * as google from '@google/maps';
declare var $: any;
declare var THREE: any;
declare var google: any;

@Component({
  selector: 'app-course-map',
  templateUrl: './course-map.component.html',
  styleUrls: ['./course-map.component.css']
})
export class CourseMapComponent implements OnInit {

  @Input() info: object;
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;


  mapRef: any;
  @Input() markerVideoJump: any;

  @Output() announceVideoHook: EventEmitter<any> = new EventEmitter();

  constructor() { }

  // onVideoJump(e) {
  //   console.log('CourseMap Component caught videoJump event: ');
  //   console.log(e);
  // }
  centerOnMarker(idx: number) {
    console.log('Center course-map on location index: ' + idx);
    // console.log(this.mapRef);
    // console.log(this.mapRef.setCenter);

    // this.map.setCenter({lat: this.info.poi[idx].gps.lat, lng: this.info.poi[idx].gps.lng });
  }
  mapClicked(e) {
    // console.log(e);
  }
  markerClicked(e) {
    console.log('pos: ');
    console.log(e);
    this.map.setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()});
    let gmi = e.va.path[1];
    const look = '[data-index="' + $(gmi).attr('id').replace('gmimap', '') + '"] a';
    // console.log(look);
    const $navItem = $(gmi).closest('.card').find(look);
    // console.log($navItem);
    $navItem.get(0).click();
  }

  ngOnInit() {
    const t = this;
    setTimeout(function() {
      const mapProperties = {
        center: new google.maps.LatLng(t.info['pos'][0].gps.lat, t.info['poi'][0].gps.lng),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.HYBRID
      };
      t.map = new google.maps.Map(t.mapElement.nativeElement, mapProperties);
      t.mapRef = t.map;
      let tmp;
      const markerObjList = [];
      if (t && t.info && t.info['poi']) {
        for (let i = 0; i < t.info['poi'].length; i++){
          // console.log(t.info.poi[i]);
          tmp = new google.maps.Marker({
            title: t.info['poi'][i].title,
            position: {
              lat: t.info['poi'][i].gps.lat,
              lng: t.info['poi'][i].gps.lng
          }});
          tmp.addListener('click', t.markerClicked);
          tmp.setMap(t.map);
          markerObjList.push(tmp);
        }
        t.map.addListener('click', t.mapClicked);
        const announceObj = {message: 'course-map is ready', mapReference: t.map,
                             centerMethod: t.centerOnMarker, markerList: markerObjList};
        // console.log('announcing from course-map onInit(): ');
        // console.log(announceObj);
        t.announceVideoHook.emit( announceObj );
      }

    }, 1);
  }

}
