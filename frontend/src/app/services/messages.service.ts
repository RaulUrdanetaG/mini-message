import { Injectable } from '@angular/core';
import { Message, UsersAndMessages } from '../interfaces/message';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseURL: string = 'https://mini-message-backend.onrender.com/';

  constructor(private http: HttpClient) {}

  getMessages() {
    return firstValueFrom(this.http.get<UsersAndMessages>(this.baseURL));
  }

  postMessage(Message: Message) {
    return firstValueFrom(this.http.post<any>(this.baseURL, Message));
  }
}
