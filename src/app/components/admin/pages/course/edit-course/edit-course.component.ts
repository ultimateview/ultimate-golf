import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { IGolfCourse } from 'src/app/models/golf/course/golf-course.model';
import { GolfcourseService } from './../../../../../shared/services/golf/golfcourse.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  id: string;
  course: IGolfCourse;

  courseForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private _svc: GolfcourseService) { }

  ngOnInit() {
    // this.id = this.route.params['id'];
    this.route.params.subscribe(params => {
      this.id = params['id'];

      // In a real app: dispatch action to load the details here.
      this._svc.get(this.id).subscribe((item) => { this.setForm(item); });
   });
  }

  setForm(item) {
    this.course = item;
    this.courseForm.controls['title'].setValue(this.course.title);
    this.courseForm.controls['description'].setValue(this.course.description);
  }

  saveCourse() {
    console.log('saveCourse(): ');
    console.log(this.courseForm);
    this.course.title = this.courseForm.get('title').value;
    this.course.description = this.courseForm.get('description').value;
    this._svc.update(this.course);
  }

}
