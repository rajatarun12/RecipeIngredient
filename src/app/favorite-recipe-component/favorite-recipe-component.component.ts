import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {LoginComponent} from "../side-nav/side-nav.component";
import {DatabaseServiceService} from "../services/database-service.service";

@Component({
  selector: 'app-favorite-recipe-component',
  templateUrl: './favorite-recipe-component.component.html',
  styleUrls: ['./favorite-recipe-component.component.css'],
  providers: [DatabaseServiceService]
})
export class FavoriteRecipeComponentComponent implements OnInit{
  detailView = false;
  recipeDetails: any = {};
  recipes = [];
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public registerRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private db: DatabaseServiceService) {
  }
  ngOnInit(){
      this.db.getFavoriteRecipes(this.data.user).then(res => {
        Object.keys(res).forEach(key => {
          this.recipes.push(res[key][0]['name']);
        })
      })
  }
  detailViewToggle(){
    this.detailView = !this.detailView;
  }
  handleUrlChange(url){
    window.open(url,'_blank')
  }
  getRecipeDetails(recipe){
    this.db.getRecipe(recipe).then(res => {
        this.recipeDetails = res;
        this.detailView = true;
    })
  }

}
