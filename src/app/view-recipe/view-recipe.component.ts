import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {RecipeModel} from "../Models/recipeModel";
import {AppGlobal} from "../Content/AppGlobal";
import {TranslateService} from "@ngx-translate/core";
import { AngularFireDatabase } from 'angularfire2/database';
import {FirebaseOperation} from "angularfire2/database/interfaces";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {UserModel} from "../Models/UserModel";
import {DatabaseServiceService} from "../services/database-service.service";
import {SnackBarComponent} from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css'],
  host: {'(window:scroll)' : 'onWindowScroll()'},
  providers: [RecipeService, NgbTooltipConfig, AppGlobal, DatabaseServiceService]
})
export class ViewRecipeComponent implements OnInit {
  @Input() recipes: RecipeModel;
  @Input() user: UserModel;
  @ViewChild(SnackBarComponent)
    snackBarRef: SnackBarComponent;
  ingredient = '';
  recipeCollection: AngularFirestoreCollection<RecipeModel>;
  recipeList: Observable<any>;
  navIsFixed: boolean;
  filterValue: String;
  sortValue: String;
  constructor(private recipeService: RecipeService,
              @Inject(DOCUMENT) private document: Document,
              private appGlobal:AppGlobal,
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

  getFilterList() {
    return this.recipes.getFilterList();
  }
  handleUrlChange(url){
    window.open(url,'_blank');
  }

  getFilterResults(filterType){
    this.filterValue = filterType;
    this.recipes.getFilteredItem(filterType);
  }
  addToFav(obj){
    this.foodDb.addToFav(obj,this.user['email']).then(res => {
      this.snackBarRef.openSnackBar('Recipe added to favorites');
    });
  }
  getSortResults(sortType) {
    const sortTypeMap = {
      'ASC': 'Low to High',
      'DESC': 'High to Low'
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
}
