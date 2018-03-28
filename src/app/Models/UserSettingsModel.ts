import {Injectable} from "@angular/core";

@Injectable()
export class UserSettingsModel {
  name: String;
  age: String;
  country: String;
  language: String;
  constructor(user){
    this.name = user.name || '';
    this.age = user.age || '';
    this.country= user.country || '';
    this.language = user.language || '';
  }
}
