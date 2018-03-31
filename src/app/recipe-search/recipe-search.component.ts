import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {RecipeModel} from '../Models/recipeModel';
import {Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {AppGlobal} from "../Content/AppGlobal";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../Models/UserModel";
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase/app';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
  providers: [RecipeService, AppGlobal, AuthService]
})
export class RecipeSearchComponent implements OnInit {
  public recipe: RecipeModel;
  hideHeader: Boolean = false;
  appleImagePath: String =  environment.appleImagePath;
  opened: Boolean;
  user: UserModel;
  hideBadges: Boolean = false;
  notifications: any;
  constructor(private recipeService: RecipeService,
              @Inject(DOCUMENT) private document: Document,
              public appGlobal:AppGlobal,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    let language = '';
    this.activatedRoute.params.forEach(param => {
      language = param['language']
    });
    this.translate.setDefaultLang(language || this.appGlobal.defaultContent);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      this.hideBadges = true;
    }
    else {
      this.hideBadges = false;
    }
    firebase.auth().getRedirectResult().then(result => {
      this.authService.getUserNotifications().then(notifications => {
        if(!notifications){
          this.notifications = [{title: "You have 0 Notifications"}];
        }
        this.notifications = notifications;
      });
    });
  }
  setUserInfo(user){
    this.user = user;
  }
  sendRecipes(result){
    this.recipe = result;
  }
}
