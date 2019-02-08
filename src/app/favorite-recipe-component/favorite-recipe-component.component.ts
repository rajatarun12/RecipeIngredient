import {Component, ElementRef, Inject, OnInit, ViewChild, Optional, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseServiceService} from '../services/database-service.service';

import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-favorite-recipe-component',
  templateUrl: './favorite-recipe-component.component.html',
  styleUrls: ['./favorite-recipe-component.component.scss'],
  providers: [DatabaseServiceService,BreakpointObserver]
})
export class FavoriteRecipeComponentComponent implements OnInit{
  detailView = true;
  recipes;
  @Input() dashboardView;
  @Input() userEmail;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DatabaseServiceService, private breakpointsService: BreakpointObserver) {}
  ngOnInit() {
      this.db.getFavoriteRecipes(this.userEmail).then(res => {
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
  toggleExpand(b: boolean) {
    this.detailView = b;
  }
}
