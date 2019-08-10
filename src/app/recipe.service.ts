import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) { }
  appId = '6fb2b01c';
  appKey = 'f577ee7aa6c106243295bdcfba890639';
  apiURL = 'https://api.edamam.com/search';
  getRecipe(ingredient) {
    const recipeUrl = this.apiURL + '?q=' + ingredient + '&app_id=' + this.appId + '&app_key=' + this.appKey;
    return this.http.get(recipeUrl);
  }
}



