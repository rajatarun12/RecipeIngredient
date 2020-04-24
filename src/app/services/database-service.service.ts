
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
  export class DatabaseServiceService {

  // private user: Observable<firebase.User>;
  constructor(private db: AngularFireDatabase) {
  }


  getFavoriteRecipes(userEmail) {
    const ref = firebase.database().ref('/users/' + userEmail.split('@')[0] + '/favoriteRecipe');
    const childPromises = [];
    return new Promise(resolve => {
      ref.on('value', val => {
        resolve(val.val());
      });
    });

  }
  addToFav(obj, email){
    let updateObj;
    return this.getRecipe(obj.title).then((res: any) => {
      if (res){
        res.likes ? (res.likes += 1) : (res.likes = 1);
        updateObj = res;
      }
      else{
        obj.likes = 1;
        updateObj = obj;
      }
    }).then(() => {
      return this.db.database.ref('favoriteRecipes/' + obj.title).update(updateObj).then(res => {
        this.db.database.ref('users/' + (email).split('@')[0] + '/favoriteRecipe').push([{name: obj.title}]);
      }).catch(err => {
        console.log(err);
      });
    });

  }
  getRecipe(recipe) {
    const ref = firebase.database().ref('/favoriteRecipes/' + recipe);
    const childPromises = [];
    return new Promise(resolve => {
      ref.on('value', val => {
        resolve(val.val());
      });
    });
  }

  }

