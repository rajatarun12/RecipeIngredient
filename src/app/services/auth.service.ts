
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as firebasefunctions from '@firebase/functions';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AuthService {
  // private user: Observable<firebase.User>;
  private app;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    // this.user = firebaseAuth.authState;
  }

  loginWithEmail(email, password){
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email, password){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  signOut(){
    return this.firebaseAuth.auth.signOut();
  }
  signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuth.auth.signInWithRedirect(provider).then(() => {
       firebase.auth().getRedirectResult();
    });
  }

  updateUserDetails(formData){
    const email = this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd);
    return ref.update(formData);
  }

  signInWithFacebook(){
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.firebaseAuth.auth.signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult();
    });
  }
  getUserNotifications(){
    const email = this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd + '/notifications');
    return new Promise(res => {
      ref.once('value', snapshot => {
        const notificationData = snapshot.val();
        if (notificationData){
          res(notificationData);
        }
        res(false);
      });
    });
  }
  checkAndReturnUser(userEmail ?: string){
    const email = userEmail || this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd);

    return new Promise(res => {
      ref.once('value', snapshot => {
        const userData = snapshot.val();
        if (userData){
          res(userData);
        }
        res(false);
      });
    });
  }
  checkiIfObjectIsThere(email){
    const ref = firebase.database().ref('/users');

    return new Promise(res => {
      const email = this.firebaseAuth.auth.currentUser.email;
      const emailAd = email.split('@')[0];
      ref.once('value', snapshot => {
        const userData = snapshot.val();
        if (Object.keys(userData).indexOf(emailAd) > -1){
          res(userData);
        }
        res(false);
      });
    });
  }

  getFollowersDetails() {
    const email = this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd + '/followers');
    return new Promise(res => {
      ref.once('value', snapshot => {
        const followersData = snapshot.val();
        if (followersData){
          res(followersData);
        }
        res(false);
      });
    });
  }

  addFollower(foundUser: any) {
    const email = this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd + '/followers');
    return new Promise(res => {
      ref.push(foundUser).then(snapshot => {
       res(snapshot);
      });
    });
  }

  getMyRecipeDetails(emailId) {
    const email = emailId || this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd + '/myRecipes');
    return new Promise(res => {
      ref.once('value', snapshot => {
        const recipesData = snapshot.val();
        if (recipesData){
          res(recipesData);
        }
        res(false);
      });
    });
  }

  saveMyRecipe(rawValue: any) {
    const email = this.firebaseAuth.auth.currentUser.email;
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd + '/myRecipes');
    return new Promise(res => {
      ref.push(rawValue).then(snapshot => {
        res(snapshot);
      });
    });
  }

  getUserDetails(email) {
    const emailAd = email.split('@')[0];
    const ref = firebase.database().ref('/users/' + emailAd);
    return new Promise(res => {
      ref.once('value', snapshot => {
        res(snapshot.val());
      });
    });
  }
}
