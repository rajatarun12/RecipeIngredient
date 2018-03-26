import {Injectable} from "@angular/core";

@Injectable()
export class UserModel {
  name: String;
  email: String;
  uid: String;
  login: Boolean;
  constructor(user){
    this.login = user.login;
    this.name = user.displayName;
    this.email = user.email;
    this.uid= user.uid;
  }
}
