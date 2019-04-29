import { Component, OnInit } from '@angular/core';

import { IGolfCourse } from 'src/app/models/golf/course/golf-course.model';
import { CourseService } from './../../../../../shared/services/golf/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Array<IGolfCourse>;
  constructor(private _courseService: CourseService) { }

  ngOnInit() {
    this.courses = this._courseService.getCourses();
  }

}
