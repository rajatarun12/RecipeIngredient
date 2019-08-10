import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {RecipeSearchComponent} from '../search/recipe-search/recipe-search.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
  }
  public openSnackBar(message){
    this.snackBar.open(message,'',{
      duration: 2000
    });
  }
};
