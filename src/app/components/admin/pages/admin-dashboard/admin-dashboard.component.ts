import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from './../../../../shared/services/golf/course.service';
import { GolfcourseService } from './../../../../shared/services/golf/golfcourse.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _svc: GolfcourseService, private router: Router) { }

  ngOnInit() {
  }

  async createNewCourse(courseName) {
    // this._golfService.createCourse(courseName);
    const newItem = await this._svc.add({
      title: courseName,
      description: ''
    });
    // console.log('newItem:');
    // console.log(newItem);
    this.router.navigate(['admin/course/edit/' + newItem.id]);
  }

}
