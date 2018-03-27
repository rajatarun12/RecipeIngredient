
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as firebasefunctions from 'firebase/functions';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user = _firebaseAuth.authState;
  }

  loginWithEmail(email,password){
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email,password);
  }
  registerWithEmail(email,password){
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email,password);
  }
  signOut(){
    return this._firebaseAuth.auth.signOut();
  }
  signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    return this._firebaseAuth.auth.signInWithRedirect(provider).then(function(){
      return firebase.auth().getRedirectResult();
    });
  }
  signInWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    return this._firebaseAuth.auth.signInWithRedirect(provider).then(function(){
      return firebase.auth().getRedirectResult();
    });
  }
  checkiIfObjectIsThere(email){
    var ref = firebase.database().ref('/users');

    return new Promise(res => {
      var emailAd = email.split('@')[0];
      ref.once("value",snapshot => {
        const userData = snapshot.val();
        if (Object.keys(userData).indexOf(emailAd) > -1){
          res(true);
        }
        res(false);
      });
    });
  }
}
