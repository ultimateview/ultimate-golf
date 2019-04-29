import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IVideoTime } from './IVideoTime';

@Injectable({
  providedIn: 'root'
})
export class VideoTimeService {
  private _videoTimeSource = new BehaviorSubject<IVideoTime>({
    percent: 0,
    currentTime: 0,
    duration: 0,
    status: 'untouched',
    videoYardsTraveled: 0,
    videoYardsTotal: 0,
    videoYardsOut: 0,
    videoYardsClosestIndex: 0
  });
  videoTimeItem$ = this._videoTimeSource.asObservable();

  constructor() { }

  changeVideoTime(obj: IVideoTime) {
    this._videoTimeSource.next(obj);
  }
}
