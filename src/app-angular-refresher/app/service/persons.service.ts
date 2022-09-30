import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

interface IStarwarsChar {
  results: IResult[];
}
interface IResult {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: [];
  starships: string[];
  url: string;
  vehicles: string[];
}
@Injectable({ providedIn: 'root' })
export class PersonsService {
  personSubject = new Subject<string[]>();
  personsList: string[] = [];

  constructor(private http: HttpClient) {}

  fetchPersons(): void {
    this.http
      .get('https://swapi.dev/api/people')
      .pipe(
        map((response) => (response as IStarwarsChar).results.map(
            (character) => character.name
          ))
      )
      .subscribe((transformedRes) => {
        this.personSubject.next(transformedRes);
      });
  }

  addPerson(personNew: string): void {
    this.personsList.push(personNew);
    this.personSubject.next(this.personsList);
  }

  removePerson(personName: string): void {
    this.personsList = this.personsList.filter((person) => person !== personName);
    this.personSubject.next(this.personsList);
  }
}
