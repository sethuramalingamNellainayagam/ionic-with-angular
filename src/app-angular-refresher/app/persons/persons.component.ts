import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonsService } from '../service/persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit, OnDestroy {
  persons: string[] = [];
  fetched = false;
  private personsSubscription: Subscription = new Subscription();

  constructor(private personsService: PersonsService) {}

  ngOnInit(): void {
    this.personsSubscription = this.personsService.personSubject.subscribe(
      (persons) => {
        this.persons = persons;
        this.fetched = false;
      }
    );
    this.fetched = true;
    this.personsService.fetchPersons();
  }

  removePerson(name: string): void {
    this.personsService.removePerson(name);
  }

  ngOnDestroy(): void {
    this.personsSubscription.unsubscribe();
  }
}
