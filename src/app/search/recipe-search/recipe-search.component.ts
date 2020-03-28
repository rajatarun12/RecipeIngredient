import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../recipe.service';
import {RecipeModel} from '../../Models/recipeModel';
import {Inject, HostListener } from '@angular/core';
import {AppGlobal} from '../../Content/AppGlobal';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import * as firebase from "firebase/app";
import {UserModel} from '../../Models/UserModel';
import {AuthService} from '../../services/auth.service';
import {LoginComponent} from '../../login/login.component';
import { environment } from '../../../environments/environment';
import {BreakpointObserver} from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import {RegisterComponent} from '../../register/register.component';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
  providers: [RecipeService, AppGlobal, AuthService]
})
export class RecipeSearchComponent implements OnInit {
  public recipe;
  hideHeader: Boolean = false;
  appleImagePath: String =  environment.appleImagePath;
  opened: Boolean;
  isXs: Boolean = false;
  language;
  loginActive;
  displayName;
  ingredients;
  hideBadges: Boolean = false;
  notifications: any;
  constructor(private recipeService: RecipeService,
              public appGlobal: AppGlobal,
              public dialog: MatDialog,
              private translate: TranslateService,
              private route: ActivatedRoute,
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
    const localStorageData = localStorage.getItem('recipeSearchData');
    let localStorageDataJSON;
    if(localStorageData){
      localStorageDataJSON = JSON.parse(localStorageData);
    }
    if(localStorageDataJSON && localStorageDataJSON.user){
        this.updateUserData(localStorageDataJSON);
    } else {
      firebase.auth().getRedirectResult().then(result => {
          localStorage.setItem('recipeSearchData', JSON.stringify(result));
          this.updateUserData(result);
          this.authService.getUserNotifications().then(notifications => {
            if(!notifications){
              this.notifications = [{title: 'You have 0 Notifications'}];
            }
            this.notifications = notifications;
          });
    });
    }
    // Check whether SiriKit extension activates the test service
    // @ts-ignore
    const prefs = plugins.appPreferences;
    const suitePrefs = prefs.suite('group.recipesearch');
    this.route.params.forEach(param => {
      this.language = param['language']
    });
    this.translate.setDefaultLang(this.language || this.appGlobal.defaultContent);
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
  updateUserData(result){
    let user;
    if (result.user) {
      user = result.user;
    }
    if(user){
      const resultObj = {
        login: true,
        email: result.user.email,
        displayName: result.user.displayName,
        name: result.user.displayName,
        uid: result.user.uid
      };

      const user = new UserModel(resultObj);
      // this.userInfo.emit(resultObj);
      // this.userEmail = resultObj.email;
      this.displayName = resultObj.displayName;
      this.loginActive = true;
    }
  }
  login(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '30em',
      panelClass: 'login-container',
      data: {
        authLabel: 'LoginLabel',
        language: this.language
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.login){
        // this.userInfo.emit(result);
        // this.userEmail = result.email;
        this.loginActive = true;
        this.displayName = result.displayName;
      }
    });
  }

  register(){
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: '30em',
      panelClass: 'login-container',
      data: {
        authLabel: 'registerLabel',
        language: this.language
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.login){
        // this.userInfo.emit(result);
        // this.userEmail = result.email;
        this.loginActive = true;
      }
    });
  }

  sendRecipes(result){
    this.recipe = result.recipes;
    this.ingredients = result.ingredients.split(',').filter(item => {
      if(item){
        return item;
      }
    });
  }

  clearRecipes(){
    delete this.recipe;
  }
}