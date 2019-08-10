import {Component, ElementRef, Inject, OnInit, ViewChild, Optional, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig,MatDialogRef, MatDialog, DialogPosition} from '@angular/material';
import {DatabaseServiceService} from '../services/database-service.service';
import {RecipeDetailsFlyoutComponent} from '../recipe-details-flyout/recipe-details-flyout.component';

import {BreakpointObserver} from '@angular/cdk/layout';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-favorite-recipe-component',
  templateUrl: './favorite-recipe-component.component.html',
  styleUrls: ['./favorite-recipe-component.component.scss'],
  providers: [DatabaseServiceService,BreakpointObserver]
})
export class FavoriteRecipeComponentComponent implements OnInit{
  detailView = true;
  recipes;
  totalToShow;
  @Input() dashboardView;
  @Input() userEmail;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,public overlay: Overlay,
    private db: DatabaseServiceService, private breakpointsService: BreakpointObserver) {}
  ngOnInit() {
      this.recipes = [];
      let userData = JSON.parse(localStorage.getItem('recipeSearchData'));
      this.db.getFavoriteRecipes(this.userEmail || (userData && userData.user && userData.user.email)).then(res => {
        const recipes = [];
        Object.keys(res).forEach(key => {
          recipes.push(res[key][0]['name']);
        });
        const recipesUnique = recipes.filter((recipe, index, self) => {
            return self.indexOf(recipe) === index;
        });
        const recipePromises = [];
        recipesUnique.forEach((rs) => {
          recipePromises.push(this.getRecipeDetails(rs));
        });
        Promise.all(recipePromises).then((res) => {
          this.recipes = res;
          this.totalToShow = this.dashboardView ? 4 : this.recipes.length;
        });
      });
  }
  detailViewToggle() {
    this.detailView = !this.detailView;
  }
  handleUrlChange(url){
    window.open(url, '_blank' );
  }
  getRecipeDetails(recipe){
    return this.db.getRecipe(recipe);
      // .then(res => {
      //   this.recipeDetails = res;
      //   this.detailView = true;
      // })
  }
  openDialog(recipe): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {'top': '0', 'right':'0'}
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth  = '50vw';
    dialogConfig.maxWidth  = '50vw';
    dialogConfig.height = '100%';
    dialogConfig.data = {
      recipe: recipe
    };
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();

    let dialogRef = this.dialog.open(RecipeDetailsFlyoutComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  toggleExpand(b: boolean) {
    this.detailView = b;
  }
}
