import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  parentMessage = 'This is the message from the parent';

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    const msgFromService = this.messageService.getMessage();
    console.log(msgFromService, ' msgFromService');
  }

  getMsgFromChild(event: any) {
    console.log(event, ' event in parent');
  }
}
