import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url =
    'https://raw.githubusercontent.com/NablaT/test-api/master/assets/messages.json.txt';
  getAllMessage = [];
  messages = [];
  storeAllMessages$ = new BehaviorSubject([]);
  allMessages = [];
  constructor(private http: HttpClient) {}
  getContactList() {
    return this.http.get<Message[]>(this.url);
  }

  messageList() {
    this.getAllMessage = JSON.parse(localStorage.getItem('messages-list'));
    if (this.getAllMessage) {
      this.storeAllMessages$.next(this.getAllMessage);
    } else {
      this.http
        .get<Message[]>(this.url)
        .subscribe((data) => this.storeAllMessages$.next(data));
    }
    return this.storeAllMessages$;
  }

  setMessages(messages) {
    const savedMessages = this.storeAllMessages$.value;
    this.allMessages = [...savedMessages, messages];
    this.storeAllMessages$.next(this.allMessages);
    localStorage.setItem('messages-list', JSON.stringify(this.allMessages));
  }
}
