import { Component, OnInit } from '@angular/core';
import { MessagesService } from './services/messages.service';
import {
  Message,
  Messages,
  User,
  UsersAndMessages,
} from './interfaces/message';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public messagesRes: UsersAndMessages | undefined;
  users: any[] = [];
  usersText: string = '';
  form: FormGroup;

  constructor(private _messageService: MessagesService) {
    this.form = new FormGroup({
      user: new FormControl(),
      message: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this._messageService.getMessages().subscribe((res) => {
      this.messagesRes = res;

      this.users = [];
      this.messagesRes.users.forEach((user) => {
        this.users.push(user._id);
      });

      this.usersText = this.users.join(', ');
      console.log(res);
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const newDate = new Date();
      this.form.get('date')?.setValue(format(newDate, 'dd/MM/yyyy'));
      this.form.get('time')?.setValue(format(newDate, 'hh:mm b'));
      console.log(this.form.value);
      const res = await this._messageService.postMessage(this.form.value);
      this.getMessages();
    } else {
      console.log('invalid form');
    }
  }
}
