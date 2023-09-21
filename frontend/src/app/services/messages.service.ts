import { Injectable } from '@angular/core';
import { Message, Messages, UsersAndMessages } from '../interfaces/message';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getMessages() {
    return firstValueFrom(this.http.get<UsersAndMessages>(this.baseURL));
  }

  postMessage(Message: Message) {
    return firstValueFrom(this.http.post<any>(this.baseURL, Message));
  }
}
