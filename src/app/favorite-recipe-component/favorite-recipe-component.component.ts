import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseServiceService} from '../services/database-service.service';
import { breakpointsProvider, BreakpointsService, BreakpointEvent, BreakpointConfig } from 'angular-breakpoints';

const defaultBreakpoints: BreakpointConfig = {
  xs: { max: 768 },
  sm: { min: 768, max: 992 },
  md: { min: 992, max: 1200 },
  lg: { min: 1200 }
};
@Component({
  selector: 'app-favorite-recipe-component',
  templateUrl: './favorite-recipe-component.component.html',
  styleUrls: ['./favorite-recipe-component.component.css'],
  providers: [DatabaseServiceService, breakpointsProvider(defaultBreakpoints)]
})
export class FavoriteRecipeComponentComponent implements OnInit{
  detailView = true;
  recipes;
  isXs: Boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DatabaseServiceService, private breakpointsService: BreakpointsService) {
    this.breakpointsService.changes.subscribe((event: BreakpointEvent) => {
      if (event.name === 'xs'){
        this.isXs = true;
      } else {
        this.isXs = false;
      }
    });
  }
  ngOnInit() {
      this.db.getFavoriteRecipes(this.data.user).then(res => {
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
