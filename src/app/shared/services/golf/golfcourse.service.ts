import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { IGolfCourse } from './../../../models/golf/course/golf-course.model';

@Injectable({
  providedIn: 'root'
})
export class GolfcourseService extends BaseService<IGolfCourse> {

  constructor(afs: AngularFirestore) {
    const path = 'courses';
    super(path, afs);
  }
}
