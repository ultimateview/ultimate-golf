import { Injectable } from '@angular/core';
import { IUavPositionModel } from 'src/app/models/uav-position.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  timeAsSeconds(hours: number, minutes: number, seconds: number) {
    return (hours * 360) + (minutes * 60) + seconds;
  }
  yardsBetweenPoints(start: IUavPositionModel, end: IUavPositionModel) {
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(end.lat - start.lat);
    const dLon = this.degreesToRadians(end.lng - start.lng);

    start.lat = this.degreesToRadians(start.lat);
    end.lat = this.degreesToRadians(end.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(start.lat) * Math.cos(end.lat);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const kmBetween = earthRadiusKm * c;
    const ftBetween = kmBetween * 1093.61;
    return ftBetween;
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  guid() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
