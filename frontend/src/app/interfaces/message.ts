export interface Message {
  user: string;
  message: string;
  date: string;
  time: string;
}

export interface Messages {
  _id: string;
  user: string;
  message: string;
  time: Date;
}

export interface User {
  _id: string;
}

export interface Dates {
  _id: string;
  dateMessages: Messages[];
}

export interface UsersAndMessages {
  messages: Dates[];
  users: User[];
}
