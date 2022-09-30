import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() message = '';
  childMessage = 'This is a message from child';
  @Output() messageFromChild = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitMessage() {
    this.messageFromChild.emit(this.childMessage);
  }
}
