import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GolferInfo } from 'src/app/models/golfer/golfer.info';

@Injectable({
  providedIn: 'root'
})
export class RedrawService {

  private _lastRedrawTime = new BehaviorSubject<Date>(new Date());
  lastRedraw$ = this._lastRedrawTime.asObservable();

  private _infoUpdatable = new BehaviorSubject<object>({});
  lastInfoObject$ = this._infoUpdatable.asObservable();

  private _golferInfo = new BehaviorSubject<GolferInfo>(new GolferInfo());
  playerInfoObject$ = this._golferInfo.asObservable();

  constructor() { }

  forceRedraw() {
    this._lastRedrawTime.next(new Date());
    // console.log('forceRedraw() called');
  }

  setUpdatableObservable(item) {
    this._infoUpdatable.next(item);
    // console.log('setUpdatableObservable() called');
  }

  updatePlayer(obj: object) {
    const gi = new GolferInfo();
    if (obj['name']) { gi.name = obj['name']; }
    if (obj['lat']) { gi.name = obj['lat']; }
    if (obj['lng']) { gi.name = obj['lng']; }
    this._golferInfo.next(gi);
  }
}
