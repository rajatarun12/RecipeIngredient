import {Injectable} from '@angular/core';

@Injectable()
export class UserModel {
  name: string;
  email: string;
  uid: string;
  login: boolean;
  constructor(user){
    this.login = user.login;
    this.name = user.displayName;
    this.email = user.email;
    this.uid = user.uid;
  }
}
