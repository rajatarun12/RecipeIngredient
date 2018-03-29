import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
  providers:[AuthService]
})
export class FollowersComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<FollowersComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private authService: AuthService, private fb: FormBuilder) { }
  followers: any;
  searchForm: FormGroup;
  viewContactView: Boolean = true;
  userAdded= false;
  foundUser: any;
  ngOnInit() {

    this.authService.getFollowersDetails().then(res => {
      if(!res){
        this.followers = [];
      }
      this.followers = this.formatFollowers(res);
    });
    this.searchForm =  this.fb.group({
      search: ['',Validators.email]
    });
  }
  formatFollowers(res){
    return Object.keys(res).reduce((obj, key, index, data) => {
      let tempObj = {
        name: '',
        email:''
      };
      tempObj['name'] = res[key].name;
      tempObj['email'] = res[key].email;
      obj.push(tempObj);
      return obj;
    },[])
  }
  searchUser(){
    this.authService.checkAndReturnUser(this.searchForm.getRawValue()['search']).then(user => {
      if(!user){
        this.foundUser = false;
      }
      this.foundUser ={name:  user['name'] || user['displayName'], email: user['email']};
    })
  }
  saveFavorite(){
      this.authService.addFollower(this.foundUser).then(() =>{
         this.userAdded = true;
      });
  }
  switchView(){
    this.viewContactView = !this.viewContactView;
  }
}
