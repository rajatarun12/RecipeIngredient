import {Injectable} from "@angular/core";

@Injectable()
export class UserSettingsModel {
  name: String;
  age: String;
  country: String;
  language: String;
  personalShare: Boolean;
  countryShare: Boolean;
  languageShare: Boolean;
  constructor(user){
    this.name = user.name || '';
    this.age = user.age || '';
    this.country= user.country || '';
    this.language = user.language || '';
    this.personalShare = user.personalShare || false;
    this.countryShare = user.countryShare || false;
    this.languageShare = user.languageShare || false;
   }
}
