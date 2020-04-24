import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AppGlobal} from './Content/AppGlobal';
import {UserModel} from './Models/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppGlobal]
})
export class AppComponent implements OnInit {
  user: UserModel;
  constructor(private translate: TranslateService, private appGlobal: AppGlobal) {
    translate.setDefaultLang(this.appGlobal.defaultContent);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.appGlobal.defaultContent);
  }
  ngOnInit() {
  }
  setUserInfo(user) {
    this.user = user;
  }
}
