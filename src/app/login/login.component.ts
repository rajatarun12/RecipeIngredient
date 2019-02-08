import {TranslateService} from '@ngx-translate/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserModel} from '../Models/UserModel';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppGlobal} from '../Content/AppGlobal';
import {AuthService} from '../services/auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, TranslateService, AppGlobal]
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
    private db: AngularFireDatabase,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private appGlobal:AppGlobal) {
    this.authLabel = data.authLabel;
  }
  ngOnInit(){

    this.translate.setDefaultLang(this.data.language || this.appGlobal.defaultContent);
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
      localStorage.setItem('token', result.credential.toString());
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
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  loginWithFaceBook(){
    this.authService.signInWithFacebook().then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      localStorage.setItem('token',result.credential.toString());
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
    const loginPassword = this.myForm.value.login + '-' + this.myForm.value.password;
    let auth;
    let error: String;
    if (authLabel === 'LoginLabel') {

      auth = this.authService.loginWithEmail(this.myForm.value.login, this.myForm.value.password).then(res => {
        localStorage.setItem('token', res.toString());
        const user = new UserModel({ login: true, email: this.myForm.value.login, name: '', uid: res['uid'].toString()});

        this.dialogRef.close(user);
        this.spinnerService.hide();
      }).catch(err => {
        error = err.message;
        if(err.code === 'auth/wrong-password'){
          this.myForm.controls['password'].setErrors({'invalidPassword': true} );
        }
        this.spinnerService.hide();
      });
    } else {
      auth = this.authService.registerWithEmail(this.myForm.value.login,this.myForm.value.password).then(res => {
        localStorage.setItem('token',res.toString());
        const user = new UserModel({ login: true, email: this.myForm.value.login, name: '', uid: res['uid']});
        this.createDataBaseUserObject(user).then(res => {
          this.dialogRef.close(user);
          this.spinnerService.hide();
        });

      }).catch(err => {
        error = err.message;
        this.myForm.controls['login'].setErrors({'duplicateUser': true} );
        this.spinnerService.hide();
      });
    }
    console.log(auth);
  }


}
