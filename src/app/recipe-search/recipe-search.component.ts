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
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
  providers: [RecipeService, AppGlobal, AuthService]
})
export class RecipeSearchComponent implements OnInit {
  public recipe;
  hideHeader: Boolean = false;
  appleImagePath: String =  environment.appleImagePath;
  opened: Boolean;
  isXs: Boolean = false;
  user: UserModel;
  hideBadges: Boolean = false;
  notifications: any;
  constructor(private recipeService: RecipeService,
              @Inject(DOCUMENT) private document: Document,
              public appGlobal: AppGlobal,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private breakpointsService: BreakpointObserver) {
    this.breakpointsService.observe('(max-width: 768px)').subscribe(result => {
      if (result.matches) {
        this.isXs = true;
      } else {
        this.isXs = false;
      }
    });
  }

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
    // Check whether SiriKit extension activates the test service
    // @ts-ignore
    const prefs = plugins.appPreferences;
    const suitePrefs = prefs.suite('group.recipesearch');

    suitePrefs.fetch(
      function(value) {
        // Activated by voice control
        console.log(value);
        if (value === 'Test') {
          // Clear the auto start
          suitePrefs.remove(function() {}, function() {}, 'start');
          console.log('worked');
          // Run a test service
          // runTest();
        }
      },
      // Error
      function(error) {

      },
      'start'
    );
  }
  setUserInfo(user){
    this.user = user;
  }
  sendRecipes(result){
    this.recipe = result;
  }
}
