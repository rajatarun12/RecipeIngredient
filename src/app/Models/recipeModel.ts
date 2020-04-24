import {Recipe} from './recipe';

export class RecipeModel {
  RecipeObject?: object[] = [];
  count =  0;
  originalList?: any;
  previousList?: object[] = [];
  currentIndex = 10;
  currentSearchQuery = '';

  constructor(private recipes) {
    if (recipes) {
      this.previousList = recipes.RecipeObject;
      this.pollRecipeData();
      this.count = recipes.count;
      this.originalList = recipes.originalList;
      this.currentSearchQuery = recipes.currentSearchQuery;
    }
  }

  getFilterList() {
    const labels = [];
    const recipeResult = this.originalList.hits;
    recipeResult.forEach(recipe => {
      recipe.recipe.dietLabels.forEach(dietLabel => {
        if (labels.indexOf(dietLabel) > -1) {
          return;
        }
        else {
          labels.push(dietLabel);
        }
      });
    });
    return labels;
  }

  getSortResults(sortType, filterValue) {
    const tempObj = this.RecipeObject;
    const sortMap = {
      'Low-Carb': {
        ASC: 'Carbs',
        DESC: 'Carbs'
      },
      'High-Protein': {
        ASC: 'Protien',
        DESC: 'Protien'
      },
      'Low-Fat': {
        ASC: 'Fat',
        DESC: 'Fat'
      },
      Relevance: {
        ASC: 'Protien',
        DESC: 'Protien'
      },
      Balanced: {
        ASC: 'Fat',
        DESC: 'Fat'
      }
    };
    const sortParameter = sortMap[filterValue][sortType];

    function compare(a, b) {
      if (a.majorNutrients[sortParameter] < b.majorNutrients[sortParameter]) {
        return sortType === 'ASC' ? -1 : 1;
      }
      if (a.majorNutrients[sortParameter] > b.majorNutrients[sortParameter]) {
        return sortType === 'ASC' ? 1 : -1;
      }
      return 0;
    }

    this.RecipeObject = tempObj.sort(compare);
  }

  getFilteredItem(filterType) {
    const resultArr = [];
    const tempObj = this.previousList;
    tempObj.forEach((obj: Recipe) => {
      if (obj.dietLabels.indexOf(filterType)) {
        resultArr.push(obj);
      }
    });
    this.RecipeObject = resultArr.length ? resultArr : tempObj;
  }

  getRecipes(recipes) {
    const recipesList = recipes.reduce((recipesList, recipe) => {
      const tempRecipe = new Recipe();
      const dailyNutrients = this.getNutrients(recipe.recipe.totalDaily);
      const totalNutrients = this.getNutrients(recipe.recipe.totalNutrients);
      tempRecipe.ingredients = recipe.recipe.ingredientLines;
      tempRecipe.calories = recipe.recipe.calories;
      tempRecipe.nutrients = totalNutrients[0];
      tempRecipe.majorNutrients = this.majorNutrients(recipe.recipe.totalNutrients);
      tempRecipe.dailyNutrients = dailyNutrients[0];
      tempRecipe.percentDaily = [totalNutrients[1], dailyNutrients[1]];
      tempRecipe.image = recipe.recipe.image;
      tempRecipe.title = recipe.recipe.label;
      tempRecipe.recipieUrl = recipe.recipe.url;
      tempRecipe.dietLabels = recipe.recipe.dietLabels;
      tempRecipe.healthLabels = recipe.recipe.healthLabels;
      tempRecipe.fav = false;
      recipesList.push(tempRecipe);
      return recipesList;
    }, []);
    this.RecipeObject = recipesList;
    this.getSortResults('ASC', 'High-Protein');
    return this.RecipeObject;
  }

  majorNutrients(nutrients) {
    const nutrientsList = {};
    Object.keys(nutrients).forEach(nutrientObj => {
      const tempObj = [];
      const nutrient = nutrients[nutrientObj];
      nutrientsList[nutrient.label] = Number(nutrient.quantity.toString()).toFixed(2);
    });
    return nutrientsList;
  }

  getNutrients(nutrients) {
    const nutrientsList = [];
    const nutrientsDict = {};
    Object.keys(nutrients).forEach(nutrientObj => {
      const tempObj = [];
      const nutrient = nutrients[nutrientObj];
      tempObj.push(nutrient.label);
      nutrientsDict[nutrient.label] = Number(nutrient.quantity.toString()).toFixed(2);
      tempObj.push(Number(nutrient.quantity.toString()).toFixed(2) + ' ' + nutrient.unit);
      nutrientsList.push(tempObj);
    });
    return [nutrientsList, nutrientsDict];
  }
  pollRecipeData(){
      const tempData = Object.assign([], this.previousList);
      this.RecipeObject = tempData.slice(0, this.currentIndex);
      this.currentIndex += 10;
  }

  clearRecipes() {
    this.RecipeObject = [];
    this.originalList = [];
  }

  getCurrentSearchQuery() {
    return this.currentSearchQuery;
  }
}
