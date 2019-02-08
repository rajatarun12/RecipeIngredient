import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userEmail;
  constructor() { }

  ngOnInit() {
    const userData = localStorage.getItem('recipeSearchData');
    let userDataObj = JSON.parse(userData);
    this.userEmail =  userDataObj.user.email;
  }

}
