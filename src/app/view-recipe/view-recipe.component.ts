import {Component, Input, OnChanges, OnInit, ViewChild, EventEmitter, Output, HostListener} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {RecipeModel} from '../Models/recipeModel';
import {AppGlobal} from '../Content/AppGlobal';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {UserModel} from '../Models/UserModel';
import {DatabaseServiceService} from '../services/database-service.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
  providers: [RecipeService, NgbTooltipConfig, AppGlobal, DatabaseServiceService]
})
export class ViewRecipeComponent implements OnInit, OnChanges {
  @Input() recipes: RecipeModel;
  @Input() user: UserModel;
  @Input() showRecipes: boolean;
  @Output() clearRecipes = new EventEmitter<RecipeModel>();
  @ViewChild(SnackBarComponent, { static: true })
  snackBarRef: SnackBarComponent;
  ingredient = '';
  showResults = true;
  navIsFixed: boolean;
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.recipes = new RecipeModel({
      RecipeObject: []
    });
  }
  ngOnChanges() {
      this.showResults = true;
  }
  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
  }
  clearResults() {
    this.showResults = false;
    this.clearRecipes.emit();
  }
}
