import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { breakpointsProvider, BreakpointsService, BreakpointEvent, BreakpointConfig } from 'angular-breakpoints';

const defaultBreakpoints: BreakpointConfig = {
  xs: { max: 768 },
  sm: { min: 768, max: 992 },
  md: { min: 992, max: 1200 },
  lg: { min: 1200 }
};
@Component({
  selector: 'app-recipe-slider',
  templateUrl: './recipe-slider.component.html',
  styleUrls: ['./recipe-slider.component.css'],
  providers: [breakpointsProvider(defaultBreakpoints)]
})
export class RecipeSliderComponent implements OnInit, OnChanges {
  @Input()
  recipes: any;
  @Input()
  detailView: Boolean = true;
  recipesLoaded: Promise<Boolean>;
  recipeDetails: any = {};
  curIndex = 0;
  isXs: Boolean = false;
  hideLeft: Boolean = true;
  hideRight: Boolean = false;

  constructor(private breakpointsService: BreakpointsService) {
    this.breakpointsService.changes.subscribe((event: BreakpointEvent) => {
      if (event.name === 'xs'){
        this.isXs = true;
      } else {
        this.isXs = false;
      }
    });
  }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.recipes.length > 0){
      this.recipeDetails = this.recipes[0];
      this.recipesLoaded = Promise.resolve(true);
    }
  }
  moveLeft() {
    if (this.curIndex > 1) {
      this.recipeDetails = this.recipes[this.curIndex - 1];
      this.curIndex = this.curIndex - 1;
      this.hideLeft = false;
      this.hideRight = false;
    } else {
      this.hideRight = false;
      this.hideLeft = true;
    }
  }

  moveRight() {
    if (this.curIndex < this.recipes.length - 1) {
      this.recipeDetails = this.recipes[this.curIndex + 1];
      this.curIndex = this.curIndex + 1;
      this.hideRight = false;
      this.hideLeft = false;
    } else {
      this.hideLeft = false;
      this.hideRight = true;
    }
  }
}
