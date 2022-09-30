import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersPipesComponent } from './filters-pipes.component';

describe('FiltersPipesComponent', () => {
  let component: FiltersPipesComponent;
  let fixture: ComponentFixture<FiltersPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersPipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
