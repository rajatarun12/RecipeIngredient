import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import * as crypto from 'crypto-js';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserModel} from "../Models/UserModel";
import {FavoriteRecipeComponentComponent} from "../favorite-recipe-component/favorite-recipe-component.component";
import * as firebase from "firebase/app";
import {TranslateService} from "@ngx-translate/core";
import {AppGlobal} from "../Content/AppGlobal";
import {ActivatedRoute} from "@angular/router";
import {SettingsComponent} from '../settings/settings.component';
import {LoginComponent} from '../login/login.component';
import {FollowersComponent} from '../followers/followers.component';
import {MyRecipesComponent} from '../my-recipes/my-recipes.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [AuthService, TranslateService, AppGlobal]
})
export class SideNavComponent implements OnInit {
  userEmail: String;
  loginActive: Boolean;
  displayName: String;
  language;
  @Input() user;
  @Output() userInfo = new EventEmitter<UserModel>();
  constructor(public  translate: TranslateService,
              public dialog: MatDialog,
              private auth: AuthService,
              private spinnerService :Ng4LoadingSpinnerService,
              private appGlobal:AppGlobal,
              private route: ActivatedRoute) {

    this.route.params.forEach(param => {
      this.language = param['language']
    });
    this.translate.setDefaultLang(this.language || this.appGlobal.defaultContent);
    console.log(this.translate.getLangs());
  }

  ngOnInit() {

    firebase.auth().getRedirectResult().then(result => {
      let user;
      if (result.credential) {
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
        this.userInfo.emit(resultObj);
        this.userEmail = resultObj.email;
        this.displayName = resultObj.displayName;
        this.loginActive = true;
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }
  handleFollowers(){
    let dialogRef = this.dialog.open(FollowersComponent, {
      width: '50em'
    });
  }
  signOut(){
    this.spinnerService.show();
      this.auth.signOut().then(res => {
        this.loginActive = false;
        this.userEmail = '';
        localStorage.removeItem('token');
        this.spinnerService.hide();
      });
  }

  login(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '30em',
      data: {
        authLabel: 'LoginLabel',
        language: this.language
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.login){
          this.userInfo.emit(result);
          this.userEmail = result.email;
          this.loginActive = true;
          this.displayName = result.displayName;
      }
    });
  }
  handleFavRecipes(){
    let dialogRef = this.dialog.open(FavoriteRecipeComponentComponent, {
      width: '30em',
      data: {
        user: this.userEmail
      }
    });
  }

  register(){
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '30em',
      data: {
        authLabel: 'registerLabel',
        language: this.language
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result.login){
        this.userInfo.emit(result);
        this.userEmail = result.email;
        this.loginActive = true;
      }
    });
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '50em'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  handleMyRecipies() {
    let dialogRef = this.dialog.open(MyRecipesComponent, {
      width: '50em'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
