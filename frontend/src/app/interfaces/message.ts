export interface Message {
  user: string;
  message: string;
  date: string;
  time: string;
}

export interface Messages {
  _id: string;
  users: string[];
  messages: string[];
  times: string[];
}

export interface User {
  _id: string;
}

export interface UsersAndMessages {
  messages: Messages[];
  users: User[];
}
