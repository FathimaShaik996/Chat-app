import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  id: string;
  messagesForm: FormGroup;
  message$: Observable<Message[]>;
  newMessages = [];
  getMessages$: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.message$ = this.messageService
      .messageList()
      .pipe(map(messages => messages.filter(item => item.id === this.id)));
    this.messagesForm = new FormGroup({
      message: new FormControl()
    });
  }
  sendMessage() {
    const message = this.messagesForm.value.message;
    if (message) {
      let messageInput = {
        id: this.id,
        content: message
      };
      this.messageService.setMessages(messageInput);
      this.messagesForm.reset();
    }
  }
}
