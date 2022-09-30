import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss'],
})
export class DirectivesComponent implements OnInit {
  courses = [];
  viewPage = 'first';
  coursesObj = [] as any;
  applyColor = true;

  constructor() {}

  ngOnInit(): void {}

  changeViewPage(event: any, inputViewPage: string) {
    event.preventDefault();
    console.log(inputViewPage, ' inputViewPage');
    this.viewPage = inputViewPage;
    console.log(this.viewPage, ' this.viewPage');
  }

  loadCourses() {
    this.coursesObj = [
      {
        id: 1,
        name: 'course1',
      },
      {
        id: 2,
        name: 'course2',
      },
      {
        id: 3,
        name: 'course3',
      },
    ];
  }

  trackCourses(course: any) {
    return course ? course.id : undefined;
  }
}
