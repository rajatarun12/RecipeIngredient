import { Component } from '@angular/core';
import {RecipeService} from './recipe.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService]
})
export class AppComponent {
  title = 'app';
  ingredient = '';
  spinnerEnable = false;
  public recipe: Object;

  constructor(private recipeService: RecipeService) {}
// {
//   count: result['count'],
//   recipeObjects: result['hits']
// }
  sendRecipes(result) {
    this.recipe = result;
  }

}
