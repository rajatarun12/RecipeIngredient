webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Models/recipeModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeModel; });
var RecipeModel = /** @class */ (function () {
    function RecipeModel(recipes) {
        this.recipes = recipes;
        this.RecipeObject = [];
        this.count = 0;
        if (recipes) {
            this.RecipeObject = recipes.RecipeObject;
            this.count = recipes.count;
            this.originalList = recipes.originalList;
        }
    }
    RecipeModel.prototype.getFilterList = function () {
        var recipeResult = this.originalList;
        return [];
    };
    RecipeModel.prototype.getFilteredItem = function (filterType) {
        var recipeResult = this.originalList;
    };
    return RecipeModel;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".input-bottom{\n  margin-bottom: 1em;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<ng4-loading-spinner> </ng4-loading-spinner>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search_component__ = __webpack_require__("./src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_recipe_view_recipe_component__ = __webpack_require__("./src/app/view-recipe/view-recipe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_tooltip__ = __webpack_require__("./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__recipe_search_recipe_search_component__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng4_loading_spinner__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var appRoutes = [
    { path: '', redirectTo: 'recipeSearch', pathMatch: 'full' },
    { path: 'recipeSearch', component: __WEBPACK_IMPORTED_MODULE_11__recipe_search_recipe_search_component__["a" /* RecipeSearchComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_6__search_search_component__["a" /* SearchComponent */], __WEBPACK_IMPORTED_MODULE_7__view_recipe_view_recipe_component__["a" /* ViewRecipeComponent */], __WEBPACK_IMPORTED_MODULE_11__recipe_search_recipe_search_component__["a" /* RecipeSearchComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_tooltip__["a" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material_button__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_13_ng4_loading_spinner__["Ng4LoadingSpinnerModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_7__view_recipe_view_recipe_component__["a" /* ViewRecipeComponent */], __WEBPACK_IMPORTED_MODULE_6__search_search_component__["a" /* SearchComponent */]],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/directives/validators/ingredient-check.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = IngredientCheckDirective;
function IngredientCheckDirective(nameRe) {
    return function (control) {
        var forbidden = nameRe.test(control.value);
        return forbidden ? { 'invalidChar': { vlaue: control.value } } : null;
    };
}


/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.css":
/***/ (function(module, exports) {

module.exports = "\n.input-bottom{\n  margin-bottom: 1em;\n  color: teal;\n  font-size: 3em;\n\n}\n.jumbotron {\n  padding: 4rem 2rem 1rem 2rem !important;\n  background-image: url('header.7971399dfecc5b1b0997.svg');\n  background-blend-mode: overlay;\n}\n"

/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center pad-top jumbotron\">\n  <h2 class=\"input-bottom page-header\">Ingredient Recipe Search</h2>\n  <app-search (sendRecipes)=\"sendRecipes($event)\"></app-search>\n</div>\n<div>\n  <app-view-recipe [recipes]=\"recipe\" ></app-view-recipe>\n</div>\n"

/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecipeSearchComponent = /** @class */ (function () {
    function RecipeSearchComponent(recipeService) {
        this.recipeService = recipeService;
    }
    RecipeSearchComponent.prototype.ngOnInit = function () { };
    RecipeSearchComponent.prototype.sendRecipes = function (result) {
        this.recipe = result;
    };
    RecipeSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-recipe-search',
            template: __webpack_require__("./src/app/recipe-search/recipe-search.component.html"),
            styles: [__webpack_require__("./src/app/recipe-search/recipe-search.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__recipe_service__["a" /* RecipeService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__recipe_service__["a" /* RecipeService */]])
    ], RecipeSearchComponent);
    return RecipeSearchComponent;
}());



/***/ }),

/***/ "./src/app/recipe.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng4_loading_spinner__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RecipeService = /** @class */ (function () {
    function RecipeService(http, spinnerService) {
        this.http = http;
        this.spinnerService = spinnerService;
        this.appId = 'b0e24d6e';
        this.appKey = 'bc2c16912ddb0040c965fda45160f4fa';
        this.apiURL = 'https://api.edamam.com/search';
    }
    RecipeService.prototype.getRecipe = function (ingredient) {
        var recipeUrl = this.apiURL + '?q=' + ingredient + '&app_id=' + this.appId + '&app_key=' + this.appKey + '&from=0&to=3000';
        this.spinnerService.show();
        return this.http.get(recipeUrl);
    };
    RecipeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ng4_loading_spinner__["Ng4LoadingSpinnerService"]])
    ], RecipeService);
    return RecipeService;
}());



/***/ }),

/***/ "./src/app/search/search.component.css":
/***/ (function(module, exports) {

module.exports = ".input-bottom{\n  margin-bottom: 1em;\n}\n.chevron{\n  padding-top: 2em;\n}\n.glyph{\n  background: transparent;\n}\n.danger{\n  color:red;\n}\n.ng-invalid{\n  border-color: red;\n}\n"

/***/ }),

/***/ "./src/app/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div >\n  <p *ngIf=\"!myForm.valid\" class=\"text-center danger\">please use only alphabets</p>\n  <form [formGroup]=\"myForm\" novalidate class=\"container-fluid text-center\" >\n    <div  formArrayName=\"search\" *ngFor=\"let item of myForm.get('search')['controls']; let i = index\" class=\"row\">\n      <div class=\"col-md-2\"></div>\n      <div [formGroupName]=\"i\" class=\"col-md-8 input-group\" [hidden]=\"i > 1 && !collapsed\">\n          <input type=\"text\" class=\"form-control input-bottom\" id=\"search-{{i}}\" placeholder=\"ingredient {{i+1}}\" formControlName=\"name\">\n        <span class=\"input-group-btn\" *ngIf=\"i > 0\"><button class=\"btn btn-danger\" type=\"button\" (click)=\"removeSearchBox(i)\">Remove</button></span>\n      </div>\n    </div>\n\n  <div class=\"row\">\n    <div class=\"col-md-3\"></div>\n    <div class=\"col-md-6 text-center\">\n      <button (click)=\"addSearchBox()\" [disabled]=\"inputs.length >= 10\" class=\"btn btn-primary\">Add New Ingredient</button>\n      <button (click)=\"search()\" [disabled]=\"!myForm.valid\" class=\"btn btn-primary\">Search</button>\n    </div>\n  </div>\n  <div class=\"row text-center chevron\" *ngIf=\"myForm.get('search')['controls'].length > 2\">\n    <div class=\"col-md-3\"></div>\n    <div class=\"col-md-6\">\n      <button class=\"glyph btn btn-default\" *ngIf=!collapsed (click)=\"toggleCollapse(collapsed)\"><i class=\"fas fa-angle-down fa-2x\"></i></button>\n      <button class=\"glyph btn btn-default\" *ngIf=collapsed (click)=\"toggleCollapse(collapsed)\"><i class=\"fas fa-angle-up fa-2x\"></i></button>\n    </div>\n  </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Models_recipeModel__ = __webpack_require__("./src/app/Models/recipeModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_validators_ingredient_check_directive__ = __webpack_require__("./src/app/directives/validators/ingredient-check.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchComponent = /** @class */ (function () {
    function SearchComponent(fb, recipeService, spinnerService) {
        this.fb = fb;
        this.recipeService = recipeService;
        this.spinnerService = spinnerService;
        this.sendRecipes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.inputs = ['0'];
        this.collapsed = true;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            'search': this.fb.array([this.createItem()])
        });
    };
    SearchComponent.prototype.addSearchBox = function () {
        var inputLength = this.inputs.length;
        var lastIndex = Number(this.inputs[inputLength - 1]);
        if (lastIndex < 10) {
            this.itemsGroup = this.myForm.get('search');
            this.itemsGroup.push(this.createItem());
            this.inputs.push((lastIndex + 1).toString());
        }
    };
    SearchComponent.prototype.createItem = function () {
        return this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([Object(__WEBPACK_IMPORTED_MODULE_5__directives_validators_ingredient_check_directive__["a" /* IngredientCheckDirective */])(/[^a-zA-Z ]/g)])]
        });
    };
    SearchComponent.prototype.search = function () {
        var _this = this;
        var values = this.myForm;
        this.ingredients = '';
        var ingredients = this.myForm.controls.search.value.reduce((function (ingredients, value) {
            ingredients.push(value.name);
            return ingredients;
        }), []);
        ingredients = ingredients.concat(',');
        this.recipeService.getRecipe(ingredients).subscribe(function (result) {
            _this.spinnerService.hide();
            var count = result['count'] || 0;
            var recipes = _this.getRecipes(result['hits']);
            _this.sendRecipes.emit(new __WEBPACK_IMPORTED_MODULE_3__Models_recipeModel__["a" /* RecipeModel */]({
                RecipeObject: recipes,
                count: count,
                originalList: result
            }));
        });
    };
    SearchComponent.prototype.getRecipes = function (recipes) {
        var _this = this;
        var recipesList = recipes.reduce(function (recipesList, recipe) {
            var tempRecipe = {};
            tempRecipe['ingredients'] = recipe.recipe.ingredientLines;
            tempRecipe['calories'] = recipe.recipe.calories;
            tempRecipe['nutrients'] = _this.getNutrients(recipe.recipe.totalNutrients);
            tempRecipe['dailyNutrients'] = _this.getNutrients(recipe.recipe.totalDaily);
            tempRecipe['image'] = recipe.recipe.image;
            tempRecipe['title'] = recipe.recipe.label;
            tempRecipe['recipieUrl'] = recipe.recipe.url;
            recipesList.push(tempRecipe);
            return recipesList;
        }, []);
        return recipesList;
    };
    SearchComponent.prototype.getNutrients = function (nutrients) {
        var nutrientsList = [];
        Object.keys(nutrients).forEach(function (nutrientObj) {
            var tempObj = [];
            var nutrient = nutrients[nutrientObj];
            tempObj.push(nutrient['label']);
            tempObj.push(Number(nutrient['quantity'].toString()).toFixed(2) + ' ' + nutrient['unit']);
            nutrientsList.push(tempObj);
        });
        return nutrientsList;
    };
    SearchComponent.prototype.removeSearchBox = function (index) {
        if (index > 0) {
            this.itemsGroup = this.myForm.get('search');
            this.itemsGroup.removeAt(index);
            this.inputs.pop();
            if (this.itemsGroup.length < 5 && this.collapsed) {
                this.collapsed = false;
            }
        }
    };
    SearchComponent.prototype.toggleCollapse = function () {
        this.collapsed = !this.collapsed;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], SearchComponent.prototype, "sendRecipes", void 0);
    SearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search',
            template: __webpack_require__("./src/app/search/search.component.html"),
            styles: [__webpack_require__("./src/app/search/search.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_4_ng4_loading_spinner__["Ng4LoadingSpinnerService"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.css":
/***/ (function(module, exports) {

module.exports = ".border-round{\n  border: solid gray 0.1em ;\n  border-radius: 0.4em;\n  margin-bottom: 0.3em;\n  margin-top: 0.3em;\n  margin-left:1em;\n  padding: 1em;\n}\n.media.row{\n  margin-bottom: 1em;\n}\n.border-round > img{\n  border-radius: 0.2em;\n}\n.media-left{\n}\n.btn-danger.mar-right{\n  margin-right: 1em;\n}\n.mar-left{\n  margin-left: 1em;\n}\n.tooltip-host {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 50px;\n}\n@media (min-width: 768px){\n  .border-round {\n    margin-left: 3em;\n  }\n}\n@media (max-width: 425px){\n  .border-round{\n    border-bottom: solid grey 0.1em;\n    border-top: 0;\n    padding-left: 2em;\n    margin-left: 0;\n    -webkit-box-shadow: 0.3em 0.2em 0.2em grey;\n            box-shadow: 0.3em 0.2em 0.2em grey;\n  }\n}\n@media(min-width: 992px) {\n  .pad-left{\n    padding-left: 4em;\n  }\n  .border-round{\n    margin-left: 0;\n    margin-left:3em;\n  }\n\n}\n@media (min-width: 1024px) and (max-width: 1250px){\n    .media-body{\n      margin-left: 2em;\n    }\n  .mar-left {\n    margin-left: 0;\n  }\n}\n.btn{\n  margin-bottom: 0.5em;\n}\n.scroll-to-top {\n  position: fixed;\n  bottom: 15px;\n  right: 15px;\n  opacity: 0;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out;\n}\n.show-scroll {\n  opacity: 1;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out;\n}\n"

/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row pad-left\" *ngIf=\"recipes.RecipeObject.length > 0\">\n  <div class=\"btn-group col-xs-12\">\n    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n      Relavence\n    </button>\n    <div class=\"dropdown-menu\">\n      <a class=\"dropdown-item\" (click)=\"getFilterResults('Relavence')\">Relavence</a>\n      <div class=\"dropdown-divider\"></div>\n      <a class=\"dropdown-item\" (click)=\"getFilterResults(i)\" *ngFor=\"let i of getFilterList()\">{{i}}</a>\n    </div>\n  </div>\n</div>\n<div class=\"row pad-left\">\n<div *ngFor=\"let hit of recipes.RecipeObject; let in = index\" class=\"border-round col-md-5\" >\n  <div class=\"media row\">\n    <div class=\"media-left col-xs-12 col-sm-12 col-lg-4\">\n        <img class=\"media-object\" src=\"{{hit.image}}\" width=\"150px\" height=\"150px\" alt=\"...\">\n    </div>\n    <div class=\"media-body col-xs-12 col-sm-12 col-lg-5\">\n      <h4 class=\"media-heading\">{{hit.title}}</h4>\n    </div>\n    <div class=\"col-xs-12 col-sm-12 col-lg-2 mar-left\">\n      <div class=\"row\">\n        <button class=\"btn btn-danger mar-right \" ngbTooltip=\"View Nutrients\" data-toggle=\"modal\" [attr.data-target]=\"'#nutrientModal-'+in\"><i class=\"material-icons\">info_outline</i></button>\n        <div class=\"modal fade\" id=\"nutrientModal-{{in}}\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalLabel\">Nutrients</h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">\n              <ul class=\"list-group\">\n                <li class=\"list-group-item\" *ngFor=\"let nutrient of hit.nutrients\">\n                  {{nutrient[0]}}\n                  <span class=\"badge\">{{nutrient[1]}}</span>\n                </li>\n              </ul>\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n            </div>\n          </div>\n    </div>\n  </div>\n\n\n      <a href=\"{{hit.recipieUrl}}\" target=\"_blank\">\n        <button class=\"btn btn-success\" ngbTooltip=\"View Website\"><i class=\"material-icons\">visibility</i></button></a>\n</div>\n    </div>\n  </div>\n  <div class=\"media-row\">\n    <ul>\n      <li *ngFor=\"let ingredient of hit.ingredients| slice:0:5; let i=index\">\n        {{ingredient}}\n      </li>\n    </ul>\n  </div>\n</div>\n\n  <!--Scroll to top-->\n  <div class=\"scroll-to-top\" [ngClass]=\"{'show-scroll': navIsFixed}\">\n    <button mat-mini-fab color=\"primary\" (click)=\"scrollToTop()\">\n      <i class=\"material-icons\">arrow_upward</i>\n    </button>\n  </div>\n"

/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewRecipeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Models_recipeModel__ = __webpack_require__("./src/app/Models/recipeModel.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var ViewRecipeComponent = /** @class */ (function () {
    function ViewRecipeComponent(recipeService, document) {
        this.recipeService = recipeService;
        this.document = document;
        this.ingredient = '';
    }
    ViewRecipeComponent.prototype.ngOnInit = function () {
        this.recipes = new __WEBPACK_IMPORTED_MODULE_4__Models_recipeModel__["a" /* RecipeModel */]({});
    };
    ViewRecipeComponent.prototype.getFilterList = function () {
        return this.recipes.getFilterList();
    };
    ViewRecipeComponent.prototype.getFilterResults = function (filterType) {
        this.recipes.getFilteredItem(filterType);
    };
    ViewRecipeComponent.prototype.onWindowScroll = function () {
        if (!(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100)) {
            if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
                this.navIsFixed = false;
            }
        }
        else {
            this.navIsFixed = true;
        }
    };
    ViewRecipeComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__Models_recipeModel__["a" /* RecipeModel */])
    ], ViewRecipeComponent.prototype, "recipes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:scroll', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ViewRecipeComponent.prototype, "onWindowScroll", null);
    ViewRecipeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-recipe',
            template: __webpack_require__("./src/app/view-recipe/view-recipe.component.html"),
            styles: [__webpack_require__("./src/app/view-recipe/view-recipe.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbTooltipConfig */]]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["b" /* DOCUMENT */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__recipe_service__["a" /* RecipeService */], Document])
    ], ViewRecipeComponent);
    return ViewRecipeComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    dev: true
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].dev) {
            this.receivedEvent('deviceready');
        }
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        if (id = 'deviceready') {
            Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
                .catch(function (err) { return console.log(err); });
        }
    }
};
app.initialize();


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map