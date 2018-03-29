import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatChipInputEvent} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css'],
  providers: [AuthService]
})
export class MyRecipesComponent implements OnInit {
@ViewChild(SnackBarComponent)
snackBarRef: SnackBarComponent;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  constructor( public dialogRef: MatDialogRef<MyRecipesComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService, private fb: FormBuilder) { }
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
}
