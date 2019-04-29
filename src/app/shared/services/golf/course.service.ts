import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UtilsService } from './../utilities/utils.service';
import { IGolfCourse } from 'src/app/models/golf/course/golf-course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _utils: UtilsService, private _db: AngularFirestore) { }

  createCourse(courseName: string) {
    const nid = this._utils.guid();
    this._db.collection<IGolfCourse>('courses').add({
      title: courseName, description: '', contact1: null, poi: null, id: nid
    });

  }
  getCourses() {
    return new Array<IGolfCourse>();
  }

  getHoleDataByCourseAndHoldId(courseId: string, holeId: string) {
    // dummy data for now, will need to pull from db later
    const u = this._utils;
    const obj = {
      title: 'First Hole',
      description: 'Features two sand traps and one pond. Watch out for the narrowing near the green.',
      distance: {
        white: 444,
        yellow: 403,
        red: 397,
        blue: 341
      },
      poi: [
        { shortTitle: 'Tee', title: 'Tee Position', gps: { lat: 45.084115, lng: -93.100149, distance:  0, distanceAlongPath: 0 } },
        { shortTitle: '300', title: 'Fairway 1', gps: { lat: 45.083951, lng: -93.099239, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: '250', title: 'Fairway 2', gps: { lat: 45.083914, lng: -93.098498, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: '200', title: 'Fairway 3', gps: { lat: 45.084038, lng: -93.097262, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: '150', title: 'Fairway 4', gps: { lat: 45.084159, lng: -93.096433, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: '100', title: 'Fairway 5', gps: { lat: 45.084239, lng: -93.095752, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: 'Green', title: 'Center Green', gps: { lat: 45.084291, lng: -93.095573, distance: 0, distanceAlongPath: 0 } },
        { shortTitle: 'Pin', title: 'Pin', gps: { lat: 45.084302, lng: -93.095467, distance: 0, distanceAlongPath: 0 } }
      ]
    };

    /* Loop through POIs calculating distance to pin.
       Also calculate each POIs distance along the path.
    */
    // first, walk list forward setting each POIs distance from the pin.
    let tmpText, newTmpText;
    for (let i = 0; i < obj['poi'].length; i++) {
      obj['poi'][i]['gps']['distance'] =
      this._utils.yardsBetweenPoints( { lat: obj['poi'][i].gps.lat, lng: obj['poi'][i].gps.lng },
        { lat: obj.poi[obj.poi.length - 1].gps.lat, lng: obj.poi[obj.poi.length - 1].gps.lng } );

      /* Since I'm walking the object, add spaces to shortTitle for vertical display. */
      tmpText = obj.poi[i].shortTitle;
      newTmpText = '';
      for (let j = 0; j < tmpText.length; j++) {
        newTmpText += tmpText[j] + ' ';
      }
      obj.poi[i].shortTitle = newTmpText;
    }

    // next, walk the list backward adding distance of each point along path

    let totalDist = 0;
    for (let i = obj.poi.length - 1; i > 0; i--) {
      // console.log('i: ' + i);
      totalDist +=
      this._utils.yardsBetweenPoints( { lat: obj.poi[i].gps.lat, lng: obj.poi[i].gps.lng },
        { lat: obj.poi[i - 1].gps.lat, lng: obj.poi[i - 1].gps.lng } );
      obj.poi[i - 1]['gps']['distanceAlongPath'] = totalDist;
    }
    obj['totalDistanceAlongPath'] = totalDist;
    console.log(obj);
    return obj;
  }
}
