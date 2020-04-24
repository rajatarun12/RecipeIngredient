import {Component, Input, OnChanges, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { Inject, HostListener } from '@angular/core';
import {RecipeModel} from '../Models/recipeModel';
import {AppGlobal} from '../Content/AppGlobal';
import {TranslateService} from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {FirebaseOperation} from '@angular/fire/database/interfaces';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {UserModel} from '../Models/UserModel';
import {DatabaseServiceService} from '../services/database-service.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {NutrientDialogTemplate} from '../nutrient-dialog/nutrient-dialog.component';
import {GooglemapsComponent} from '../googlemaps/googlemaps.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
  host: {'(window:scroll)' : 'onWindowScroll()'},
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
  recipeCollection: AngularFirestoreCollection<RecipeModel>;
  recipeList: Observable<any>;
  navIsFixed: boolean;
  filterValue: string;
  sortValue: string;
  constructor(private recipeService: RecipeService,
              public dialog: MatDialog,
              private appGlobal: AppGlobal,
              private spinnerService: Ng4LoadingSpinnerService,
              public translate: TranslateService,
              private db: AngularFireDatabase,
              private foodDb: DatabaseServiceService) { }

  ngOnInit() {
    this.recipes = new RecipeModel({
      RecipeObject: []
    });
    this.translate.setDefaultLang(this.appGlobal.defaultContent);
    this.translate.get('FilterLabel').subscribe((res: string) => {
      this.filterValue = res;
    });
    this.translate.get('SortLabel').subscribe((res: string) => {
      console.log(res);
      this.sortValue = res;
    });


  }
  ngOnChanges() {
      this.showResults = true;
  }
  getFilterList() {
    return this.recipes.getFilterList();
  }
  handleUrlChange(url){
    window.open(url, '_blank');
  }

  getFilterResults(filterType){
    this.filterValue = filterType;
    this.recipes.getFilteredItem(filterType);
  }

  getSortResults(sortType) {
    const sortTypeMap = {
      ASC: 'Low to High',
      DESC: 'High to Low'
    };
    this.sortValue = sortTypeMap[sortType];
    this.recipes.getSortResults(sortType, this.filterValue);
  }

  onWindowScroll() {
    if (!(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100)) {
      if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
        this.navIsFixed = false;
      }
    } else {
      this.navIsFixed = true;
    }
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
  handleNearby(title){
    const dialogRef = this.dialog.open(GooglemapsComponent, {
      width: '200em',
      data: {title}
    });
  }
  clearResults() {
    this.showResults = false;
    this.clearRecipes.emit();
  }
  addDietLabelToSearch(query){
    let ingredients = this.recipes.getCurrentSearchQuery();
    ingredients = ingredients.toString().replace(/,/g, '');
    ingredients += (',' + query);
    this.spinnerService.show();
    this.recipeService.getRecipe(ingredients).subscribe((result: any) => {
      this.spinnerService.hide();
      const recipes = this.recipes.getRecipes(result.hits);
      this.recipes.RecipeObject = recipes;
    });
  }
}
