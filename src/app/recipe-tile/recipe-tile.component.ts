import { Component, OnInit, OnChanges, Input} from '@angular/core';
import {RecipeModel} from '../Models/recipeModel';
@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit,OnChanges {
  @Input() data: any;
  showResults: boolean;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.showResults = true;
  }
}
