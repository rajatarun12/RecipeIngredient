import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {RecipeModel} from '../Models/recipeModel';
import {Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {AppGlobal} from "../Content/AppGlobal";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../Models/UserModel";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css'],
  providers: [RecipeService, AppGlobal]
})
export class RecipeSearchComponent implements OnInit {
  public recipe: RecipeModel;
  hideHeader: Boolean = false;
  opened: Boolean;
  user: UserModel;
  hideBadges: Boolean = false;
  constructor(private recipeService: RecipeService,
              @Inject(DOCUMENT) private document: Document,
              public appGlobal:AppGlobal,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let language = '';
    this.activatedRoute.params.forEach(param => {
      language = param['language']
    });
    this.translate.setDefaultLang(language || this.appGlobal.defaultContent);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      this.hideBadges = true;
    }
    else {
      this.hideBadges = false;
    }
  }
  setUserInfo(user){
    this.user = user;
  }
  sendRecipes(result) {
    this.recipe = result;
  }
}
