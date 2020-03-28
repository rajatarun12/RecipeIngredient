import {Component, Inject, OnInit, ViewChild, Optional, Input} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
  providers: [AuthService, BreakpointObserver]
})
export class MyRecipesComponent implements OnInit {
@ViewChild(SnackBarComponent)
  @Input() dashboardView;
  @Input() userEmail;
snackBarRef: SnackBarComponent;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  detailView: boolean = true;
  totalToShow;
  isXs: Boolean =  false;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService, private fb: FormBuilder, private breakpointsService: BreakpointObserver) {}
  myRecipes: any = [];
  viewRecipeView: Boolean = true;
  myRecipeForm: FormGroup;
  noRecipesFound: Boolean = false;
  dietLabels: any = [];
  ngOnInit() {
    this.myRecipes = [];
    let userData = JSON.parse(localStorage.getItem('recipeSearchData'));
    this.authService.getMyRecipeDetails(this.userEmail || (userData && userData.user && userData.user.email)).then(recipes => {
      if(!recipes){
        this.noRecipesFound = true;
      }
      else{
        this.myRecipes = this.formatRecipes(recipes);
        this.totalToShow = this.dashboardView ? 4 : this.myRecipes.length;
      }
    });

    this.myRecipeForm = this.fb.group({
      title: ['', Validators.required],
      recipeUrl: [''],
      dietLabels: [[]],
      ingredients: [],
      instructions: ['',Validators.required]
    })
  }
  formatRecipes(recipes: any) {
    return Object.keys(recipes).reduce((recipesObj, key, index, data) => {
          recipesObj.push(recipes[key]);
          return recipesObj;
    },[]);
  }

  removeDietLabel(label){

  }
  addDietLabel(event: MatChipInputEvent){
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.dietLabels.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.myRecipeForm.setValue({'dietLabels': this.dietLabels});
  }

  switchView(){
    this.viewRecipeView = !this.viewRecipeView;
  }
  saveRecipe() {
    this.authService.saveMyRecipe(this.myRecipeForm.getRawValue()).then(() => {
      this.snackBarRef.openSnackBar('Recipe saved');
    })
  }
  toggleExpand(b: boolean) {
    this.detailView = b;
  }
}
