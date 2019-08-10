import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// @ts-ignore
@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  addRecipeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addRecipeForm =  this.fb.group({
      recipeTitle: ['', Validators.email]
    });
  }

}
