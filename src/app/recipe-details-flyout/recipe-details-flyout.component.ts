import { Component, OnInit, Optional, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-recipe-details-flyout',
  templateUrl: './recipe-details-flyout.component.html',
  styleUrls: ['./recipe-details-flyout.component.scss']
})
export class RecipeDetailsFlyoutComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  recipe: any;
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.recipe = this.data['recipe'];
  }
}
