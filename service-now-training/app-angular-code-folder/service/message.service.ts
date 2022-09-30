import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message: string = 'message from service';

  constructor() { }

  getMessage(): string {
    return this.message;
  }

  setMessage(inputMsg = 'defaultValue'): void {
    this.message = inputMsg;
  }
}
