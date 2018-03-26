import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import * as crypto from 'crypto-js';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "./auth.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserModel} from "../Models/UserModel";
import {FavoriteRecipeComponentComponent} from "../favorite-recipe-component/favorite-recipe-component.component";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [AuthService]
})
export class SideNavComponent implements OnInit {
  userEmail: String;
  loginActive: Boolean;
  displayName: String;
  @Output() userInfo = new EventEmitter<UserModel>();
  constructor(public  translate: TranslateService, public dialog: MatDialog, private auth: AuthService, private spinnerService :Ng4LoadingSpinnerService) {
    console.log(this.translate.getLangs());
  }

  ngOnInit() {

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
        authLabel: 'Login'
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
        authLabel: 'Register'
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

}

@Component({
  selector: 'app-settings',
  templateUrl: 'app-settings.html',
})
export class SettingsComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-login',
  templateUrl: 'login.html',
  styleUrls: ['./side-nav.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit{
  myForm: FormGroup;
  authLabel: String;
  userInfo: any;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public registerRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService:AuthService,
    private spinnerService :Ng4LoadingSpinnerService,
    private db: AngularFireDatabase) {
    this.authLabel = data.authLabel;
  }
  ngOnInit(){
    this.myForm =  this.fb.group({
      'login': ['', Validators.compose([Validators.email, Validators.required])],
      'password': ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  createDataBaseUserObject(user){
    const userObj = {
      name: user.displayName || user.email,
      email: user.email,
      favoriteRecipes: [],
      recipes: []
    };
    return this.db.database.ref('users/'+ (user.email).split('@')[0]).set(userObj).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  loginWithGoogle(){
    this.authService.signInWithGoogle().then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      localStorage.setItem('token',result.credential);
      // The signed-in user info.
      this.userInfo = result.user;
      const user = new UserModel({
        login: true,
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      });
      this.authService.checkiIfObjectIsThere(result.user.email).then(res => {
        if(!res){
        this.createDataBaseUserObject(user).then(res => {
          this.dialogRef.close(user);
        });
        }
        else {
          this.dialogRef.close(user);
         }
      });


      // ...
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  loginWithFaceBook(){
    this.authService.signInWithFacebook().then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      localStorage.setItem('token',result.credential);
      // The signed-in user info.
      this.userInfo = result.user;
      const user = new UserModel({
        login: true,
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid
      });
      this.authService.checkiIfObjectIsThere(result.user.email).then(res => {
        if (!res) {
          this.createDataBaseUserObject(user).then(res => {
            this.dialogRef.close(user);
          });
        }
        else {
          this.dialogRef.close(user);
        }
      });

      // ...
    }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  onLoginClick(authLabel){
    this.spinnerService.show();
    const loginPassword = this.myForm.value.login +"-"+ this.myForm.value.password;
    let auth;
    let error: String;
    if(authLabel === 'Login'){
     auth = this.authService.loginWithEmail(this.myForm.value.login,this.myForm.value.password).then(res => {
        localStorage.setItem('token',res);
       const user = new UserModel({ login: true, email: this.myForm.value.login, name: '', uid: res.uid});

        this.dialogRef.close(user);
       this.spinnerService.hide();
     }).catch(err => {
        error = err.message;
       this.spinnerService.hide();
     });
    }
    else{
       auth = this.authService.registerWithEmail(this.myForm.value.login,this.myForm.value.password).then(res => {
         localStorage.setItem('token',res);
         const user = new UserModel({ login: true, email: this.myForm.value.login, name: '', uid: res.uid});
         this.createDataBaseUserObject(user).then(res=>{
           this.dialogRef.close(user);
           this.spinnerService.hide();
         });

       }).catch(err => {
         error = err.message;
         this.spinnerService.hide();
       });
    }
    console.log(auth);
  }


}
