import { Component, OnInit, Input } from '@angular/core';

import { Master, GolfCourseObject } from './../../../../golf-objects/golf.planet';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  master: Master;
  course: GolfCourseObject;
  courseList: Array<GolfCourseObject>;

  constructor() {
    this.master = new Master();
    this.course = this.master.planet.getCountry('USA', 'USA').getCourse('1234 Sherwood');
    this.courseList = this.master.planet.getCountry('USA', 'USA').courses;
  }

  ngOnInit() {
  }

}
;