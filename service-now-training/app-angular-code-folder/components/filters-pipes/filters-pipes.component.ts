import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-pipes',
  templateUrl: './filters-pipes.component.html',
  styleUrls: ['./filters-pipes.component.scss'],
})
export class FiltersPipesComponent implements OnInit {
  courseObj = {
    title: 'course title',
    rating: '4.9738',
    students: '30782',
    price: '190.32',
    releasedData: new Date(2021, 4, 4),
  };

  constructor() {}

  ngOnInit(): void {}
}
