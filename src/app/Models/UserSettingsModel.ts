import {Injectable} from "@angular/core";

@Injectable()
export class UserSettingsModel {
  name: string;
  age: string;
  country: string;
  language: string;
  personalShare: boolean;
  countryShare: boolean;
  languageShare: boolean;
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
