
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
  export class DatabaseServiceService {

  private user: Observable<firebase.User>;
  constructor(private db:AngularFireDatabase) {
  }

  getFavoriteRecipes(userEmail) {
    var ref = firebase.database().ref('/users/' + userEmail.split('@')[0] + '/favoriteRecipe');
    let childPromises = [];
    return new Promise(resolve => {
      ref.on('value', val => {
        resolve(val.val());
      })
    });

  }
  getRecipe(recipe) {
    var ref = firebase.database().ref('/favoriteRecipes/'+recipe);
    let childPromises = [];
    return new Promise(resolve => {
      ref.on('value', val => {
        resolve(val.val());
      })
    });
  }

    // var ref =firebase.database().ref('/users/'+userEmail.split('@')[0]+'/favoriteRecipe');
    // firebase.database().ref('/users/'+userEmail.split('@')[0]+'/favoriteRecipe').on('value', snapshot => {
    //   snapshot.forEach(childSnapshot => {
    //     const key = childSnapshot.key();
    //     ref.child('items').child(key).once('value', function(itemSnapshot) {
    //       console.log(itemSnapshot.val());
    //     });
    //   });
    // })
  }

}
