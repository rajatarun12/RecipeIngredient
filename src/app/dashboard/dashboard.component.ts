import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {RecipeDetailsFlyoutComponent} from '../recipe-details-flyout/recipe-details-flyout.component';
import {Overlay} from '@angular/cdk/overlay';
import {CreateRecipeComponent} from '../create-recipe/create-recipe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userEmail;

  constructor(public dialog: MatDialog, public overlay: Overlay) { }

  ngOnInit() {
    const userData = localStorage.getItem('recipeSearchData');
    const userDataObj = JSON.parse(userData);
    this.userEmail =  userDataObj.user.email;
  }

  openCreateRecipe() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {'top': '0', 'right':'0'}
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth  = '60vw';
    dialogConfig.maxWidth  = '60vw';
    dialogConfig.height = '100%';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();

    const dialogRef = this.dialog.open(CreateRecipeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
