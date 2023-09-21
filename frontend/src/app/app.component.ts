import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessagesService } from './services/messages.service';
import { UsersAndMessages } from './interfaces/message';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

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

  scrollToBottom() {
    const containerElement = this.container.nativeElement;
    containerElement.scrollTop = containerElement.scrollHeight;
  }

  async getMessages() {
    try {
      const response = await this._messageService.getMessages();

      this.messagesRes = response;

      this.users = [];
      this.messagesRes.users.forEach((user) => {
        this.users.push(user._id);
      });

      if (this.users.length > 8) {
        this.usersText = this.users.slice(0, 8).join(', ') + ' ...';
      } else {
        this.usersText = this.users.join(', ');
      }

      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    } catch (err) {
      console.log(err);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      const newDate = new Date();
      this.form.get('date')?.setValue(format(newDate, 'dd/MM/yyyy'));
      this.form.get('time')?.setValue(newDate);
      console.log(this.form.value);
      const res = await this._messageService.postMessage(this.form.value);
      this.form.reset();
      this.getMessages();
    } else {
      console.log('invalid form');
    }
    this.scrollToBottom();
  }
}
