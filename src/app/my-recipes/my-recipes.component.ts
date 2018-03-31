import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatChipInputEvent} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { breakpointsProvider, BreakpointsService, BreakpointEvent, BreakpointConfig } from 'angular-breakpoints';
const defaultBreakpoints: BreakpointConfig = {
  xs: { max: 768 },
  sm: { min: 768, max: 992 },
  md: { min: 992, max: 1200 },
  lg: { min: 1200 }
};
@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
  providers: [AuthService, breakpointsProvider(defaultBreakpoints)]
})
export class MyRecipesComponent implements OnInit {
@ViewChild(SnackBarComponent)
snackBarRef: SnackBarComponent;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  detailView: boolean = true;
  isXs: Boolean =  false;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  constructor( public dialogRef: MatDialogRef<MyRecipesComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService, private fb: FormBuilder, private breakpointsService: BreakpointsService) {
    this.breakpointsService.changes.subscribe((event: BreakpointEvent) => {
      if (event.name === 'xs'){
        this.isXs = true;
      } else {
        this.isXs = false;
      }
    });
  }
  myRecipes: any = [];
  viewRecipeView: Boolean = true;
  myRecipeForm: FormGroup;
  noRecipesFound: Boolean = false;
  dietLabels: any = [];
  ngOnInit() {
    this.authService.getMyRecipeDetails().then(recipes => {
      if(!recipes){
        this.noRecipesFound = true;
      }
      else{
        this.myRecipes = this.formatRecipes(recipes);
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
