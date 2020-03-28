import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MyRecipesComponent} from '../my-recipes/my-recipes.component';
import {FollowerInfoComponent} from '../follower-info/follower-info.component';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  providers: [AuthService]
})
export class FollowersComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<FollowersComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
               private authService: AuthService, private fb: FormBuilder) { }
  followers: any;
  searchForm: FormGroup;
  viewContactView: Boolean = true;
  userAdded= false;
  message = '';
  foundUser: any;
  ngOnInit() {

    this.authService.getFollowersDetails().then(res => {
      if (!res){
        this.followers = [];
      }
      this.followers = this.formatFollowers(res);
    });
    this.searchForm =  this.fb.group({
      search: ['', Validators.email]
    });
  }
  formatFollowers(res){
    return Object.keys(res).reduce((obj, key, index, data) => {
      obj.push(res[key]);
      return obj;
    }, []);
  }
  searchUser(){
    this.authService.checkAndReturnUser(this.searchForm.getRawValue()['search']).then(user => {
      if (!user) {
        this.foundUser = false;
        this.message = 'User not Found';
      }
      this.foundUser = {name:  user['name'] || user['displayName'], email: user['email']};
      this.message = '';
    });
  }
  saveFavorite() {
      this.authService.addFollower(this.foundUser).then(() => {
         this.userAdded = true;
      });
  }
  switchView(){
    this.viewContactView = !this.viewContactView;
  }

  viewFollowerDetails(follower) {
    this.authService.getUserDetails(follower.email).then(res => {
      if (res) {
        const dialogRef = this.dialog.open(FollowerInfoComponent, {
          width: '30em',
          data: res
        });

        dialogRef.afterClosed().subscribe(result => {
        });
      }
    });
  }

}
