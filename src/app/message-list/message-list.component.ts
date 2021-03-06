import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  loading: boolean = true;
  listOfAllSms: any;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.listOfAllSms = this.messageService.getAllMessage().subscribe((res) => {
      this.loading = false;
      this.listOfAllSms = res;
    });
  }
}
