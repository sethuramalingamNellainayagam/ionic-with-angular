import { Component } from '@angular/core';
import { PersonsService } from '../service/persons.service';

@Component({
  selector: 'app-persons-input',
  templateUrl: './persons-input.component.html',
  styleUrls: ['./persons-input.component.scss']
})
export class PersonsInputComponent {
  enteredPersonName = '';

  constructor(private personsService: PersonsService){}

  addPerson(): void{
    this.personsService.addPerson(this.enteredPersonName);
  }
}
