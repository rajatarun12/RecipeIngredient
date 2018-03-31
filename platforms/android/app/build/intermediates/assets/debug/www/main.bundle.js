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

/***/ "./src/app/Content/AppGlobal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGlobal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");

var AppGlobal = /** @class */ (function () {
    function AppGlobal(translate) {
        this.translate = translate;
        this.defaultContent = 'en';
        this.defaultContent = translate.getBrowserLang();
    }
    return AppGlobal;
}());



/***/ }),

/***/ "./src/app/Models/UserModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.login = user.login;
        this.name = user.displayName;
        this.email = user.email;
        this.uid = user.uid;
    }
    return UserModel;
}());



/***/ }),

/***/ "./src/app/Models/UserSettingsModel.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSettingsModel; });
var UserSettingsModel = /** @class */ (function () {
    function UserSettingsModel(user) {
        this.name = user.name || '';
        this.age = user.age || '';
        this.country = user.country || '';
        this.language = user.language || '';
    }
    return UserSettingsModel;
}());



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
        this.previousList = [];
        this.currentIndex = 10;
        if (recipes) {
            this.previousList = recipes.RecipeObject;
            this.pollRecipeData();
            this.count = recipes.count;
            this.originalList = recipes.originalList;
        }
    }
    RecipeModel.prototype.getFilterList = function () {
        var labels = [];
        var recipeResult = this.originalList.hits;
        recipeResult.forEach(function (recipe) {
            recipe.recipe.dietLabels.forEach(function (dietLabel) {
                if (labels.indexOf(dietLabel) > -1) {
                    return;
                }
                else {
                    labels.push(dietLabel);
                }
            });
        });
        return labels;
    };
    RecipeModel.prototype.getSortResults = function (sortType, filterValue) {
        var tempObj = this.RecipeObject;
        var sortMap = {
            "Low-Carb": {
                "ASC": "Carbs",
                "DESC": "Carbs"
            },
            "High-Protein": {
                "ASC": "Protien",
                "DESC": "Protien"
            },
            "Low-Fat": {
                "ASC": "Fat",
                "DESC": "Fat"
            },
            "Relevance": {
                "ASC": "Protien",
                "DESC": "Protien"
            },
            "Balanced": {
                "ASC": "Fat",
                "DESC": "Fat"
            }
        };
        var sortParameter = sortMap[filterValue][sortType];
        function compare(a, b) {
            if (a.majorNutrients[sortParameter] < b.majorNutrients[sortParameter])
                return sortType === 'ASC' ? -1 : 1;
            if (a.majorNutrients[sortParameter] > b.majorNutrients[sortParameter])
                return sortType === 'ASC' ? 1 : -1;
            return 0;
        }
        this.RecipeObject = tempObj.sort(compare);
    };
    RecipeModel.prototype.getFilteredItem = function (filterType) {
        var resultArr = [];
        var tempObj = this.previousList;
        tempObj.forEach(function (obj) {
            if (obj['dietLabels'].indexOf(filterType)) {
                resultArr.push(obj);
            }
        });
        this.RecipeObject = resultArr.length ? resultArr : tempObj;
    };
    RecipeModel.prototype.getRecipes = function (recipes) {
        var _this = this;
        var recipesList = recipes.reduce(function (recipesList, recipe) {
            var tempRecipe = {};
            tempRecipe['ingredients'] = recipe.recipe.ingredientLines;
            tempRecipe['calories'] = recipe.recipe.calories;
            tempRecipe['nutrients'] = _this.getNutrients(recipe.recipe.totalNutrients);
            tempRecipe['majorNutrients'] = _this.majorNutrients(recipe.recipe.totalNutrients);
            tempRecipe['dailyNutrients'] = _this.getNutrients(recipe.recipe.totalDaily);
            tempRecipe['image'] = recipe.recipe.image;
            tempRecipe['title'] = recipe.recipe.label;
            tempRecipe['recipieUrl'] = recipe.recipe.url;
            tempRecipe['dietLabels'] = recipe.recipe.dietLabels;
            tempRecipe['fav'] = false;
            recipesList.push(tempRecipe);
            return recipesList;
        }, []);
        this.RecipeObject = recipesList;
        this.getSortResults('ASC', 'High-Protein');
        return this.RecipeObject;
    };
    RecipeModel.prototype.majorNutrients = function (nutrients) {
        var nutrientsList = {};
        Object.keys(nutrients).forEach(function (nutrientObj) {
            var tempObj = [];
            var nutrient = nutrients[nutrientObj];
            nutrientsList[nutrient['label']] = Number(nutrient['quantity'].toString()).toFixed(2);
        });
        return nutrientsList;
    };
    RecipeModel.prototype.getNutrients = function (nutrients) {
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
    RecipeModel.prototype.pollRecipeData = function () {
        var tempData = this.previousList;
        this.RecipeObject = tempData.slice(0, this.currentIndex);
        this.currentIndex += 10;
    };
    return RecipeModel;
}());



/***/ }),

/***/ "./src/app/app.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".input-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}"];



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_AppComponent */
/* unused harmony export View_AppComponent_0 */
/* unused harmony export View_AppComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component_css_shim_ngstyle__ = __webpack_require__("./src/app/app.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_ng4_loading_spinner_ng4_loading_spinner_ngfactory__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__footer_component_footer_component_component_ngfactory__ = __webpack_require__("./src/app/footer-component/footer-component.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__footer_component_footer_component_component__ = __webpack_require__("./src/app/footer-component/footer-component.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__("./src/app/app.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 










var styles_AppComponent = [__WEBPACK_IMPORTED_MODULE_0__app_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_AppComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "ng4-loading-spinner", [], null, null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_ng4_loading_spinner_ng4_loading_spinner_ngfactory__["b" /* View_Ng4LoadingSpinnerComponent_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_ng4_loading_spinner_ng4_loading_spinner_ngfactory__["a" /* RenderType_Ng4LoadingSpinnerComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__["Ng4LoadingSpinnerComponent"], [__WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__["Ng4LoadingSpinnerService"]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, [" "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_router__["m" /* RouterOutlet */], [__WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], [8, null], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 1, "app-footer-component", [], null, null, null, __WEBPACK_IMPORTED_MODULE_5__footer_component_footer_component_component_ngfactory__["b" /* View_FooterComponentComponent_0 */], __WEBPACK_IMPORTED_MODULE_5__footer_component_footer_component_component_ngfactory__["a" /* RenderType_FooterComponentComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_6__footer_component_footer_component_component__["a" /* FooterComponentComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { _ck(_v, 5, 0); _ck(_v, 8, 0); }, null); }
function View_AppComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_8__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_8__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_8__Content_AppGlobal__["a" /* AppGlobal */]], null, null)], null, null); }
var AppComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-root", __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");


var AppComponent = /** @class */ (function () {
    function AppComponent(translate, appGlobal) {
        this.translate = translate;
        this.appGlobal = appGlobal;
        translate.setDefaultLang(this.appGlobal.defaultContent);
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(this.appGlobal.defaultContent);
    }
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModuleNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_tooltip_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/tooltip/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/snack-bar/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_dialog_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/dialog/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_material_datepicker_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/datepicker/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_ng_bootstrap_ng_bootstrap_alert_alert_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/alert/alert.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_ng_bootstrap_ng_bootstrap_datepicker_datepicker_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_ng_bootstrap_ng_bootstrap_modal_modal_backdrop_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-backdrop.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_ng_bootstrap_ng_bootstrap_modal_modal_window_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-window.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ng_bootstrap_ng_bootstrap_popover_popover_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/popover/popover.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_ng_bootstrap_ng_bootstrap_tooltip_tooltip_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_ng_bootstrap_ng_bootstrap_typeahead_typeahead_window_ngfactory__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__recipe_search_recipe_search_component_ngfactory__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__nutrient_dialog_nutrient_dialog_component_ngfactory__ = __webpack_require__("./src/app/nutrient-dialog/nutrient-dialog.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__favorite_recipe_component_favorite_recipe_component_component_ngfactory__ = __webpack_require__("./src/app/favorite-recipe-component/favorite-recipe-component.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__settings_settings_component_ngfactory__ = __webpack_require__("./src/app/settings/settings.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__login_login_component_ngfactory__ = __webpack_require__("./src/app/login/login.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__followers_followers_component_ngfactory__ = __webpack_require__("./src/app/followers/followers.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__my_recipes_my_recipes_component_ngfactory__ = __webpack_require__("./src/app/my-recipes/my-recipes.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_component_ngfactory__ = __webpack_require__("./src/app/app.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__ = __webpack_require__("./node_modules/@angular/animations/esm5/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__ = __webpack_require__("./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__ = __webpack_require__("./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__ = __webpack_require__("./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__ = __webpack_require__("./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_cdk_collections__ = __webpack_require__("./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__ = __webpack_require__("./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__ = __webpack_require__("./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_angularfire2__ = __webpack_require__("./node_modules/angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__ = __webpack_require__("./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_animations__ = __webpack_require__("./node_modules/@angular/animations/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ng_bootstrap_ng_bootstrap_modal_modal__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/modal/modal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ng_bootstrap_ng_bootstrap_modal_modal_stack__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/modal/modal-stack.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core_src_translate_loader__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ngx_translate_core_src_translate_compiler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.compiler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ngx_translate_core_src_translate_parser__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.parser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ngx_translate_core_src_missing_translation_handler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/missing-translation-handler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core_src_translate_store__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__angular_cdk_portal__ = __webpack_require__("./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__angular_material_sidenav__ = __webpack_require__("./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__angular_material_card__ = __webpack_require__("./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__angular_cdk_accordion__ = __webpack_require__("./node_modules/@angular/cdk/esm5/accordion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__angular_material_expansion__ = __webpack_require__("./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__angular_material_divider__ = __webpack_require__("./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__angular_material_list__ = __webpack_require__("./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__angular_material_chips__ = __webpack_require__("./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__recipe_search_recipe_search_component__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__ngx_translate_core_index__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__ng_bootstrap_ng_bootstrap_accordion_accordion_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/accordion/accordion.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ng_bootstrap_ng_bootstrap_alert_alert_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/alert/alert.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ng_bootstrap_ng_bootstrap_buttons_buttons_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/buttons/buttons.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__ng_bootstrap_ng_bootstrap_carousel_carousel_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/carousel/carousel.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__ng_bootstrap_ng_bootstrap_collapse_collapse_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/collapse/collapse.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__ng_bootstrap_ng_bootstrap_datepicker_datepicker_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__ng_bootstrap_ng_bootstrap_dropdown_dropdown_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__ng_bootstrap_ng_bootstrap_modal_modal_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/modal/modal.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__ng_bootstrap_ng_bootstrap_pagination_pagination_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/pagination/pagination.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__ng_bootstrap_ng_bootstrap_popover_popover_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/popover/popover.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__ng_bootstrap_ng_bootstrap_progressbar_progressbar_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/progressbar/progressbar.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__ng_bootstrap_ng_bootstrap_rating_rating_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/rating/rating.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__ng_bootstrap_ng_bootstrap_tabset_tabset_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tabset/tabset.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__ng_bootstrap_ng_bootstrap_timepicker_timepicker_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__ng_bootstrap_ng_bootstrap_tooltip_tooltip_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__ng_bootstrap_ng_bootstrap_typeahead_typeahead_module__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/typeahead/typeahead.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__ng_bootstrap_ng_bootstrap_index__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























































































var AppModuleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵcmf"](__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]], function (_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmod"]([__WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵCodegenComponentFactoryResolver"], [[8, [__WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_tooltip_typings_index_ngfactory__["a" /* TooltipComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__["a" /* MatSnackBarContainerNgFactory */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_snack_bar_typings_index_ngfactory__["b" /* SimpleSnackBarNgFactory */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_dialog_typings_index_ngfactory__["a" /* MatDialogContainerNgFactory */], __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_material_datepicker_typings_index_ngfactory__["a" /* MatDatepickerContentNgFactory */], __WEBPACK_IMPORTED_MODULE_7__node_modules_ng_bootstrap_ng_bootstrap_alert_alert_ngfactory__["a" /* NgbAlertNgFactory */], __WEBPACK_IMPORTED_MODULE_8__node_modules_ng_bootstrap_ng_bootstrap_datepicker_datepicker_ngfactory__["a" /* NgbDatepickerNgFactory */], __WEBPACK_IMPORTED_MODULE_9__node_modules_ng_bootstrap_ng_bootstrap_modal_modal_backdrop_ngfactory__["a" /* NgbModalBackdropNgFactory */], __WEBPACK_IMPORTED_MODULE_10__node_modules_ng_bootstrap_ng_bootstrap_modal_modal_window_ngfactory__["a" /* NgbModalWindowNgFactory */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ng_bootstrap_ng_bootstrap_popover_popover_ngfactory__["a" /* NgbPopoverWindowNgFactory */], __WEBPACK_IMPORTED_MODULE_12__node_modules_ng_bootstrap_ng_bootstrap_tooltip_tooltip_ngfactory__["a" /* NgbTooltipWindowNgFactory */], __WEBPACK_IMPORTED_MODULE_13__node_modules_ng_bootstrap_ng_bootstrap_typeahead_typeahead_window_ngfactory__["a" /* NgbTypeaheadWindowNgFactory */], __WEBPACK_IMPORTED_MODULE_14__recipe_search_recipe_search_component_ngfactory__["a" /* RecipeSearchComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_15__nutrient_dialog_nutrient_dialog_component_ngfactory__["a" /* NutrientDialogTemplateNgFactory */], __WEBPACK_IMPORTED_MODULE_16__favorite_recipe_component_favorite_recipe_component_component_ngfactory__["a" /* FavoriteRecipeComponentComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_17__settings_settings_component_ngfactory__["a" /* SettingsComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_18__login_login_component_ngfactory__["a" /* LoginComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_19__followers_followers_component_ngfactory__["a" /* FollowersComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_20__my_recipes_my_recipes_component_ngfactory__["a" /* MyRecipesComponentNgFactory */], __WEBPACK_IMPORTED_MODULE_21__app_component_ngfactory__["a" /* AppComponentNgFactory */]]], [3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵq"], [[3, __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_22__angular_common__["m" /* NgLocalization */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["l" /* NgLocaleLocalization */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["u" /* ɵa */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_ID"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵi"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵn"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵo"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["r" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Sanitizer"], null, [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["c" /* DomSanitizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["f" /* HAMMER_GESTURE_CONFIG */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["g" /* HammerGestureConfig */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["d" /* EVENT_MANAGER_PLUGINS */], function (p0_0, p0_1, p1_0, p2_0, p2_1) { return [new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["k" /* ɵDomEventsPlugin */](p0_0, p0_1), new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["o" /* ɵKeyEventsPlugin */](p1_0), new __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["n" /* ɵHammerGesturesPlugin */](p2_0, p2_1)]; }, [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["f" /* HAMMER_GESTURE_CONFIG */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["d" /* EVENT_MANAGER_PLUGINS */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["e" /* EventManager */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["d" /* ɵc */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["e" /* ɵd */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["c" /* ɵb */], [__WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["a" /* AnimationDriver */], __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["c" /* ɵAnimationStyleNormalizer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["f" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["l" /* ɵDomRendererFactory2 */], __WEBPACK_IMPORTED_MODULE_24__angular_animations_browser__["b" /* ɵAnimationEngine */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["p" /* ɵSharedStylesHost */], null, [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["m" /* ɵDomSharedStylesHost */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Testability"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["h" /* Meta */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["h" /* Meta */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["i" /* Title */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["i" /* Title */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["h" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["n" /* ɵh */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["PLATFORM_ID"], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["l" /* ɵf */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["o" /* ɵi */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["o" /* ɵi */], [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["h" /* HttpXsrfTokenExtractor */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["m" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["a" /* HTTP_INTERCEPTORS */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["o" /* ɵi */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["k" /* ɵe */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["k" /* ɵe */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["i" /* XhrFactory */], null, [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["k" /* ɵe */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["g" /* HttpXhrBackend */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["g" /* HttpXhrBackend */], [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["i" /* XhrFactory */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["b" /* HttpBackend */], null, [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["g" /* HttpXhrBackend */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["f" /* HttpHandler */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["j" /* ɵc */], [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["b" /* HttpBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["c" /* HttpClient */], [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["f" /* HttpHandler */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["b" /* DIR_DOCUMENT */], null, [__WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["c" /* Directionality */], __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["c" /* Directionality */], [[2, __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["b" /* DIR_DOCUMENT */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["l" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["l" /* InteractivityChecker */], [__WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["k" /* FocusTrapFactory */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["k" /* FocusTrapFactory */], [__WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["l" /* InteractivityChecker */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](136192, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["e" /* AriaDescriber */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["c" /* ARIA_DESCRIBER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["e" /* AriaDescriber */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["p" /* LiveAnnouncer */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["o" /* LIVE_ANNOUNCER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["p" /* LiveAnnouncer */]], [2, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["m" /* LIVE_ANNOUNCER_ELEMENT_TOKEN */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["h" /* FOCUS_MONITOR_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["j" /* FocusMonitor */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["b" /* SCROLL_DISPATCHER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["d" /* ScrollDispatcher */]], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["f" /* VIEWPORT_RULER_PROVIDER_FACTORY */], [[3, __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["g" /* ViewportRuler */]], __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["h" /* ScrollStrategyOptions */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["h" /* ScrollStrategyOptions */], [__WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["d" /* ScrollDispatcher */], __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["d" /* OverlayContainer */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["j" /* ɵa */], [[3, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["d" /* OverlayContainer */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["g" /* OverlayPositionBuilder */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["g" /* OverlayPositionBuilder */], [__WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["g" /* ViewportRuler */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["e" /* OverlayKeyboardDispatcher */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["m" /* ɵf */], [[3, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["e" /* OverlayKeyboardDispatcher */]], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["h" /* ScrollStrategyOptions */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["d" /* OverlayContainer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["g" /* OverlayPositionBuilder */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["e" /* OverlayKeyboardDispatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_22__angular_common__["d" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["k" /* ɵc */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["l" /* ɵd */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_32__angular_forms__["w" /* ɵi */], __WEBPACK_IMPORTED_MODULE_32__angular_forms__["w" /* ɵi */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_32__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_32__angular_forms__["f" /* FormBuilder */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["d" /* ErrorStateMatcher */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["d" /* ErrorStateMatcher */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["d" /* MediaMatcher */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["d" /* MediaMatcher */], [__WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["a" /* Platform */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["a" /* BreakpointObserver */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["a" /* BreakpointObserver */], [__WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["d" /* MediaMatcher */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__["b" /* MAT_TOOLTIP_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__["c" /* MAT_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__["b" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__["b" /* MatSnackBar */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["p" /* LiveAnnouncer */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["a" /* BreakpointObserver */], [3, __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__["b" /* MatSnackBar */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_37__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_37__angular_cdk_collections__["e" /* ɵa */], [[3, __WEBPACK_IMPORTED_MODULE_37__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_38__angular_http__["c" /* BrowserXhr */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["c" /* BrowserXhr */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_38__angular_http__["g" /* ResponseOptions */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["b" /* BaseResponseOptions */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_38__angular_http__["i" /* XSRFStrategy */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["j" /* ɵa */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_38__angular_http__["h" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["h" /* XHRBackend */], [__WEBPACK_IMPORTED_MODULE_38__angular_http__["c" /* BrowserXhr */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["g" /* ResponseOptions */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["i" /* XSRFStrategy */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_38__angular_http__["f" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["a" /* BaseRequestOptions */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_38__angular_http__["d" /* Http */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["k" /* ɵb */], [__WEBPACK_IMPORTED_MODULE_38__angular_http__["h" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["f" /* RequestOptions */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["c" /* MAT_DIALOG_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["d" /* MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["e" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["e" /* MatDialog */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["g" /* Location */]], [2, __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["b" /* MAT_DIALOG_DEFAULT_OPTIONS */]], __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["c" /* MAT_DIALOG_SCROLL_STRATEGY */], [3, __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["e" /* MatDialog */]], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["d" /* OverlayContainer */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["g" /* MatDatepickerIntl */], __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["g" /* MatDatepickerIntl */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["a" /* MAT_DATEPICKER_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["b" /* MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__["b" /* MAT_MENU_SCROLL_STRATEGY */], __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__["g" /* ɵc21 */], [__WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["b" /* Overlay */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["h" /* MAT_DATE_LOCALE */], null, [__WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["c" /* DateAdapter */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["y" /* NativeDateAdapter */], [[2, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["h" /* MAT_DATE_LOCALE */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_42_angularfire2__["b" /* FirebaseApp */], __WEBPACK_IMPORTED_MODULE_42_angularfire2__["f" /* ɵa */], [__WEBPACK_IMPORTED_MODULE_42_angularfire2__["c" /* FirebaseAppConfigToken */], __WEBPACK_IMPORTED_MODULE_42_angularfire2__["d" /* FirebaseAppName */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["a" /* AngularFirestore */], [__WEBPACK_IMPORTED_MODULE_42_angularfire2__["b" /* FirebaseApp */], [2, __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["c" /* ɵa */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_44__angular_animations__["b" /* AnimationBuilder */], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["b" /* ɵBrowserAnimationBuilder */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["RendererFactory2"], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["b" /* DOCUMENT */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_45_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_45_angularfire2_database__["c" /* _getAngularFireDatabase */], [__WEBPACK_IMPORTED_MODULE_42_angularfire2__["b" /* FirebaseApp */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_46_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_46_angularfire2_auth__["c" /* _getAngularFireAuth */], [__WEBPACK_IMPORTED_MODULE_42_angularfire2__["b" /* FirebaseApp */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__["Ng4LoadingSpinnerService"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_48__ng_bootstrap_ng_bootstrap_modal_modal__["a" /* NgbModal */], __WEBPACK_IMPORTED_MODULE_48__ng_bootstrap_ng_bootstrap_modal_modal__["a" /* NgbModal */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_49__ng_bootstrap_ng_bootstrap_modal_modal_stack__["a" /* NgbModalStack */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_50__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["v" /* ɵf */], [__WEBPACK_IMPORTED_MODULE_50__angular_router__["k" /* Router */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_50__angular_router__["d" /* NoPreloading */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["d" /* NoPreloading */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](6144, __WEBPACK_IMPORTED_MODULE_50__angular_router__["f" /* PreloadingStrategy */], null, [__WEBPACK_IMPORTED_MODULE_50__angular_router__["d" /* NoPreloading */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](135680, __WEBPACK_IMPORTED_MODULE_50__angular_router__["n" /* RouterPreloader */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["n" /* RouterPreloader */], [__WEBPACK_IMPORTED_MODULE_50__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_50__angular_router__["f" /* PreloadingStrategy */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_50__angular_router__["e" /* PreloadAllModules */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["e" /* PreloadAllModules */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_50__angular_router__["h" /* ROUTER_INITIALIZER */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["y" /* ɵi */], [__WEBPACK_IMPORTED_MODULE_50__angular_router__["w" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_BOOTSTRAP_LISTENER"], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_50__angular_router__["h" /* ROUTER_INITIALIZER */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](5120, __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core_src_translate_loader__["b" /* TranslateLoader */], __WEBPACK_IMPORTED_MODULE_1__app_module__["b" /* ɵ0 */], [__WEBPACK_IMPORTED_MODULE_26__angular_common_http__["c" /* HttpClient */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_52__ngx_translate_core_src_translate_compiler__["a" /* TranslateCompiler */], __WEBPACK_IMPORTED_MODULE_52__ngx_translate_core_src_translate_compiler__["b" /* TranslateFakeCompiler */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_53__ngx_translate_core_src_translate_parser__["b" /* TranslateParser */], __WEBPACK_IMPORTED_MODULE_53__ngx_translate_core_src_translate_parser__["a" /* TranslateDefaultParser */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_54__ngx_translate_core_src_missing_translation_handler__["b" /* MissingTranslationHandler */], __WEBPACK_IMPORTED_MODULE_54__ngx_translate_core_src_missing_translation_handler__["a" /* FakeMissingTranslationHandler */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](4608, __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["a" /* TranslateService */], [__WEBPACK_IMPORTED_MODULE_55__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], __WEBPACK_IMPORTED_MODULE_51__ngx_translate_core_src_translate_loader__["b" /* TranslateLoader */], __WEBPACK_IMPORTED_MODULE_52__ngx_translate_core_src_translate_compiler__["a" /* TranslateCompiler */], __WEBPACK_IMPORTED_MODULE_53__ngx_translate_core_src_translate_parser__["b" /* TranslateParser */], __WEBPACK_IMPORTED_MODULE_54__ngx_translate_core_src_missing_translation_handler__["b" /* MissingTranslationHandler */], __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["b" /* USE_DEFAULT_LANG */], __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["c" /* USE_STORE */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_22__angular_common__["c" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["c" /* CommonModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["q" /* ɵa */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"], function () { return [__WEBPACK_IMPORTED_MODULE_50__angular_router__["r" /* ɵb */]()]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_50__angular_router__["w" /* ɵg */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["w" /* ɵg */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"], function (p0_0, p1_0) { return [__WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["t" /* ɵh */](p0_0), __WEBPACK_IMPORTED_MODULE_50__angular_router__["x" /* ɵh */](p1_0)]; }, [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgProbeToken"]], __WEBPACK_IMPORTED_MODULE_50__angular_router__["w" /* ɵg */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"], [[2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["APP_INITIALIZER"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](131584, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵConsole"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationInitStatus"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationModule"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */], [[3, __WEBPACK_IMPORTED_MODULE_23__angular_platform_browser__["a" /* BrowserModule */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["e" /* HttpClientXsrfModule */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["e" /* HttpClientXsrfModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["d" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["d" /* HttpClientModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["a" /* BidiModule */], __WEBPACK_IMPORTED_MODULE_27__angular_cdk_bidi__["a" /* BidiModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */], true, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["m" /* MatCommonModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["m" /* MatCommonModule */], [[2, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["f" /* MATERIAL_SANITY_CHECKS */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["b" /* PlatformModule */], __WEBPACK_IMPORTED_MODULE_28__angular_cdk_platform__["b" /* PlatformModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["a" /* A11yModule */], __WEBPACK_IMPORTED_MODULE_29__angular_cdk_a11y__["a" /* A11yModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_57__angular_cdk_portal__["g" /* PortalModule */], __WEBPACK_IMPORTED_MODULE_57__angular_cdk_portal__["g" /* PortalModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["c" /* ScrollDispatchModule */], __WEBPACK_IMPORTED_MODULE_30__angular_cdk_scrolling__["c" /* ScrollDispatchModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["f" /* OverlayModule */], __WEBPACK_IMPORTED_MODULE_31__angular_cdk_overlay__["f" /* OverlayModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_58__angular_material_sidenav__["h" /* MatSidenavModule */], __WEBPACK_IMPORTED_MODULE_58__angular_material_sidenav__["h" /* MatSidenavModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_32__angular_forms__["t" /* ɵba */], __WEBPACK_IMPORTED_MODULE_32__angular_forms__["t" /* ɵba */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_32__angular_forms__["j" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_32__angular_forms__["j" /* FormsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_32__angular_forms__["r" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_32__angular_forms__["r" /* ReactiveFormsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_59__angular_material_form_field__["c" /* MatFormFieldModule */], __WEBPACK_IMPORTED_MODULE_59__angular_material_form_field__["c" /* MatFormFieldModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_60__angular_material_input__["c" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_60__angular_material_input__["c" /* MatInputModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_61__angular_material_card__["d" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_61__angular_material_card__["d" /* MatCardModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["c" /* LayoutModule */], __WEBPACK_IMPORTED_MODULE_34__angular_cdk_layout__["c" /* LayoutModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__["d" /* MatTooltipModule */], __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__["d" /* MatTooltipModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["x" /* MatRippleModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["x" /* MatRippleModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_62__angular_material_button__["c" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_62__angular_material_button__["c" /* MatButtonModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__["d" /* MatSnackBarModule */], __WEBPACK_IMPORTED_MODULE_36__angular_material_snack_bar__["d" /* MatSnackBarModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_63__angular_cdk_accordion__["c" /* CdkAccordionModule */], __WEBPACK_IMPORTED_MODULE_63__angular_cdk_accordion__["c" /* CdkAccordionModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_64__angular_material_expansion__["b" /* MatExpansionModule */], __WEBPACK_IMPORTED_MODULE_64__angular_material_expansion__["b" /* MatExpansionModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["o" /* MatLineModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["o" /* MatLineModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["v" /* MatPseudoCheckboxModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["v" /* MatPseudoCheckboxModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_65__angular_material_divider__["a" /* MatDividerModule */], __WEBPACK_IMPORTED_MODULE_65__angular_material_divider__["a" /* MatDividerModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_66__angular_material_list__["d" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_66__angular_material_list__["d" /* MatListModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_38__angular_http__["e" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_38__angular_http__["e" /* HttpModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["g" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_39__angular_material_dialog__["g" /* MatDialogModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["h" /* MatDatepickerModule */], __WEBPACK_IMPORTED_MODULE_40__angular_material_datepicker__["h" /* MatDatepickerModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__["e" /* MatMenuModule */], __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__["e" /* MatMenuModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_67__angular_material_chips__["e" /* MatChipsModule */], __WEBPACK_IMPORTED_MODULE_67__angular_material_chips__["e" /* MatChipsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["z" /* NativeDateModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["z" /* NativeDateModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["q" /* MatNativeDateModule */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["q" /* MatNativeDateModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_42_angularfire2__["a" /* AngularFireModule */], __WEBPACK_IMPORTED_MODULE_42_angularfire2__["a" /* AngularFireModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["b" /* AngularFirestoreModule */], __WEBPACK_IMPORTED_MODULE_43_angularfire2_firestore__["b" /* AngularFirestoreModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_25__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_50__angular_router__["q" /* ɵa */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["t" /* ɵd */], [[3, __WEBPACK_IMPORTED_MODULE_50__angular_router__["k" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_50__angular_router__["p" /* UrlSerializer */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["c" /* DefaultUrlSerializer */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_50__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["b" /* ChildrenOutletContexts */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_50__angular_router__["g" /* ROUTER_CONFIGURATION */], { useHash: true }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_22__angular_common__["h" /* LocationStrategy */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["s" /* ɵc */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["r" /* PlatformLocation */], [2, __WEBPACK_IMPORTED_MODULE_22__angular_common__["a" /* APP_BASE_HREF */]], __WEBPACK_IMPORTED_MODULE_50__angular_router__["g" /* ROUTER_CONFIGURATION */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_22__angular_common__["g" /* Location */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["g" /* Location */], [__WEBPACK_IMPORTED_MODULE_22__angular_common__["h" /* LocationStrategy */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoader"], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], [2, __WEBPACK_IMPORTED_MODULE_0__angular_core__["SystemJsNgModuleLoaderConfig"]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_50__angular_router__["i" /* ROUTES */], function () { return [[{ path: "", redirectTo: "recipeSearch/en", pathMatch: "full" }, { path: "recipeSearch/:language", component: __WEBPACK_IMPORTED_MODULE_68__recipe_search_recipe_search_component__["a" /* RecipeSearchComponent */] }]]; }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](1024, __WEBPACK_IMPORTED_MODULE_50__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["u" /* ɵe */], [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_50__angular_router__["p" /* UrlSerializer */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["b" /* ChildrenOutletContexts */], __WEBPACK_IMPORTED_MODULE_22__angular_common__["g" /* Location */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModuleFactoryLoader"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_50__angular_router__["i" /* ROUTES */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["g" /* ROUTER_CONFIGURATION */], [2, __WEBPACK_IMPORTED_MODULE_50__angular_router__["o" /* UrlHandlingStrategy */]], [2, __WEBPACK_IMPORTED_MODULE_50__angular_router__["j" /* RouteReuseStrategy */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_50__angular_router__["l" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_50__angular_router__["l" /* RouterModule */], [[2, __WEBPACK_IMPORTED_MODULE_50__angular_router__["q" /* ɵa */]], [2, __WEBPACK_IMPORTED_MODULE_50__angular_router__["k" /* Router */]]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_45_angularfire2_database__["b" /* AngularFireDatabaseModule */], __WEBPACK_IMPORTED_MODULE_45_angularfire2_database__["b" /* AngularFireDatabaseModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_46_angularfire2_auth__["b" /* AngularFireAuthModule */], __WEBPACK_IMPORTED_MODULE_46_angularfire2_auth__["b" /* AngularFireAuthModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_69__ngx_translate_core_index__["a" /* TranslateModule */], __WEBPACK_IMPORTED_MODULE_69__ngx_translate_core_index__["a" /* TranslateModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__["Ng4LoadingSpinnerModule"], __WEBPACK_IMPORTED_MODULE_47_ng4_loading_spinner__["Ng4LoadingSpinnerModule"], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_70__ng_bootstrap_ng_bootstrap_accordion_accordion_module__["a" /* NgbAccordionModule */], __WEBPACK_IMPORTED_MODULE_70__ng_bootstrap_ng_bootstrap_accordion_accordion_module__["a" /* NgbAccordionModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_71__ng_bootstrap_ng_bootstrap_alert_alert_module__["a" /* NgbAlertModule */], __WEBPACK_IMPORTED_MODULE_71__ng_bootstrap_ng_bootstrap_alert_alert_module__["a" /* NgbAlertModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_72__ng_bootstrap_ng_bootstrap_buttons_buttons_module__["a" /* NgbButtonsModule */], __WEBPACK_IMPORTED_MODULE_72__ng_bootstrap_ng_bootstrap_buttons_buttons_module__["a" /* NgbButtonsModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_73__ng_bootstrap_ng_bootstrap_carousel_carousel_module__["a" /* NgbCarouselModule */], __WEBPACK_IMPORTED_MODULE_73__ng_bootstrap_ng_bootstrap_carousel_carousel_module__["a" /* NgbCarouselModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_74__ng_bootstrap_ng_bootstrap_collapse_collapse_module__["a" /* NgbCollapseModule */], __WEBPACK_IMPORTED_MODULE_74__ng_bootstrap_ng_bootstrap_collapse_collapse_module__["a" /* NgbCollapseModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_75__ng_bootstrap_ng_bootstrap_datepicker_datepicker_module__["a" /* NgbDatepickerModule */], __WEBPACK_IMPORTED_MODULE_75__ng_bootstrap_ng_bootstrap_datepicker_datepicker_module__["a" /* NgbDatepickerModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_76__ng_bootstrap_ng_bootstrap_dropdown_dropdown_module__["a" /* NgbDropdownModule */], __WEBPACK_IMPORTED_MODULE_76__ng_bootstrap_ng_bootstrap_dropdown_dropdown_module__["a" /* NgbDropdownModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_77__ng_bootstrap_ng_bootstrap_modal_modal_module__["a" /* NgbModalModule */], __WEBPACK_IMPORTED_MODULE_77__ng_bootstrap_ng_bootstrap_modal_modal_module__["a" /* NgbModalModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_78__ng_bootstrap_ng_bootstrap_pagination_pagination_module__["a" /* NgbPaginationModule */], __WEBPACK_IMPORTED_MODULE_78__ng_bootstrap_ng_bootstrap_pagination_pagination_module__["a" /* NgbPaginationModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_79__ng_bootstrap_ng_bootstrap_popover_popover_module__["a" /* NgbPopoverModule */], __WEBPACK_IMPORTED_MODULE_79__ng_bootstrap_ng_bootstrap_popover_popover_module__["a" /* NgbPopoverModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_80__ng_bootstrap_ng_bootstrap_progressbar_progressbar_module__["a" /* NgbProgressbarModule */], __WEBPACK_IMPORTED_MODULE_80__ng_bootstrap_ng_bootstrap_progressbar_progressbar_module__["a" /* NgbProgressbarModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_81__ng_bootstrap_ng_bootstrap_rating_rating_module__["a" /* NgbRatingModule */], __WEBPACK_IMPORTED_MODULE_81__ng_bootstrap_ng_bootstrap_rating_rating_module__["a" /* NgbRatingModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_82__ng_bootstrap_ng_bootstrap_tabset_tabset_module__["a" /* NgbTabsetModule */], __WEBPACK_IMPORTED_MODULE_82__ng_bootstrap_ng_bootstrap_tabset_tabset_module__["a" /* NgbTabsetModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_83__ng_bootstrap_ng_bootstrap_timepicker_timepicker_module__["a" /* NgbTimepickerModule */], __WEBPACK_IMPORTED_MODULE_83__ng_bootstrap_ng_bootstrap_timepicker_timepicker_module__["a" /* NgbTimepickerModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_84__ng_bootstrap_ng_bootstrap_tooltip_tooltip_module__["a" /* NgbTooltipModule */], __WEBPACK_IMPORTED_MODULE_84__ng_bootstrap_ng_bootstrap_tooltip_tooltip_module__["a" /* NgbTooltipModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_85__ng_bootstrap_ng_bootstrap_typeahead_typeahead_module__["a" /* NgbTypeaheadModule */], __WEBPACK_IMPORTED_MODULE_85__ng_bootstrap_ng_bootstrap_typeahead_typeahead_module__["a" /* NgbTypeaheadModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_86__ng_bootstrap_ng_bootstrap_index__["a" /* NgbModule */], __WEBPACK_IMPORTED_MODULE_86__ng_bootstrap_ng_bootstrap_index__["a" /* NgbModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](512, __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], __WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["l" /* ɵf */], "XSRF-TOKEN", []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_26__angular_common_http__["m" /* ɵg */], "X-XSRF-TOKEN", []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_58__angular_material_sidenav__["a" /* MAT_DRAWER_DEFAULT_AUTOSIZE */], false, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_35__angular_material_tooltip__["a" /* MAT_TOOLTIP_DEFAULT_OPTIONS */], { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500 }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_41__angular_material_menu__["a" /* MAT_MENU_DEFAULT_OPTIONS */], { overlapTrigger: true, xPosition: "after", yPosition: "below" }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["g" /* MAT_DATE_FORMATS */], __WEBPACK_IMPORTED_MODULE_33__angular_material_core__["j" /* MAT_NATIVE_DATE_FORMATS */], []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_42_angularfire2__["c" /* FirebaseAppConfigToken */], { apiKey: "AIzaSyB1JSIvCrkz_82kvSkqTM-1gzJROSg16fk", authDomain: "myrecipesearch-c52aa.firebaseapp.com", databaseURL: "https://myrecipesearch-c52aa.firebaseio.com", projectId: "myrecipesearch-c52aa", storageBucket: "", messagingSenderId: "1041313927441" }, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_42_angularfire2__["d" /* FirebaseAppName */], undefined, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["c" /* USE_STORE */], true, []), __WEBPACK_IMPORTED_MODULE_0__angular_core__["ɵmpd"](256, __WEBPACK_IMPORTED_MODULE_56__ngx_translate_core_src_translate_service__["b" /* USE_DEFAULT_LANG */], undefined, [])]); });



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ɵ0; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_search_recipe_search_component__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__ = __webpack_require__("./node_modules/@ngx-translate/http-loader/index.js");



var appRoutes = [
    { path: '', redirectTo: 'recipeSearch/en', pathMatch: 'full' },
    { path: 'recipeSearch/:language', component: __WEBPACK_IMPORTED_MODULE_1__recipe_search_recipe_search_component__["a" /* RecipeSearchComponent */] }
];
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, 'http://s3.us-east-2.amazonaws.com/locale-content/', '.json');
}
var ɵ0 = (createTranslateLoader);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
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

/***/ "./src/app/favorite-recipe-component/favorite-recipe-component.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".mar-left[_ngcontent-%COMP%]{\n  margin-left: 1em;\n}\n.mar-top[_ngcontent-%COMP%]{\n  margin-top: 1em;\n}\n.media-heading[_ngcontent-%COMP%] {\n  margin-left: 2em !important;\n}\n.likeButton[_ngcontent-%COMP%]{\n  margin-left: 1em;\n  margin-top: 0.4em;\n  color: red;\n}"];



/***/ }),

/***/ "./src/app/favorite-recipe-component/favorite-recipe-component.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_FavoriteRecipeComponentComponent */
/* unused harmony export View_FavoriteRecipeComponentComponent_0 */
/* unused harmony export View_FavoriteRecipeComponentComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteRecipeComponentComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__favorite_recipe_component_component_css_shim_ngstyle__ = __webpack_require__("./src/app/favorite-recipe-component/favorite-recipe-component.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_card_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_card__ = __webpack_require__("./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_database_service_service__ = __webpack_require__("./src/app/services/database-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__favorite_recipe_component_component__ = __webpack_require__("./src/app/favorite-recipe-component/favorite-recipe-component.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 













var styles_FavoriteRecipeComponentComponent = [__WEBPACK_IMPORTED_MODULE_0__favorite_recipe_component_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_FavoriteRecipeComponentComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_FavoriteRecipeComponentComponent, data: {} });

function View_FavoriteRecipeComponentComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "button", [["class", "list-group-item list-group-item-action"], ["href", "#"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getRecipeDetails(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_FavoriteRecipeComponentComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 4, "div", [["class", "list-group"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FavoriteRecipeComponentComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.recipes; _ck(_v, 5, 0, currVal_0); }, null); }
function View_FavoriteRecipeComponentComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "li", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["\n              ", "\n            "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_FavoriteRecipeComponentComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 51, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 3, "button", [["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.detailViewToggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, 0, 0, "i", [["class", "fas fa-arrow-left fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, [" "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 43, "mat-card", [["class", "mat-card"]], null, null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_card_typings_index_ngfactory__["b" /* View_MatCard_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_card_typings_index_ngfactory__["a" /* RenderType_MatCard */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_card__["a" /* MatCard */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, 0, 39, "div", [["class", "media row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 3, "div", [["class", "media-left col-xs-12 col-sm-12 col-md-12 col-lg-4"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 0, "img", [["alt", "..."], ["class", "media-object"], ["height", "150px"], ["width", "150px"]], [[8, "src", 4]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 4, "div", [["class", "media-body col-xs-12 col-sm-12 col-md-12 col-lg-5"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 1, "h4", [["class", "media-heading"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](20, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](23, 0, null, null, 15, "div", [["class", "col-xs-12 col-sm-12 col-lg-12 mar-left mar-top mar-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](25, 0, null, null, 12, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](27, 0, null, null, 5, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleUrlChange(_co.recipeDetails.recipieUrl) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](29, 0, null, null, 3, "button", [["class", "btn btn-success"], ["color", "accent"], ["mat-raised-button", ""]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_3__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](30, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](31, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["visibility"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](34, 0, null, null, 2, "span", [["class", "likeButton"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, null, 0, "i", [["class", "fas fa-heart"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](36, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](40, 0, null, null, 8, "div", [["class", "media-row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](42, 0, null, null, 5, "ul", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 2, null, View_FavoriteRecipeComponentComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](45, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["s" /* SlicePipe */], []), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_4 = "accent"; _ck(_v, 30, 0, currVal_4); var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 45, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 46).transform(_co.recipeDetails.ingredients, 0, 5)); _ck(_v, 45, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).disabled || null); _ck(_v, 2, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "", _co.recipeDetails.image, ""); _ck(_v, 14, 0, currVal_1); var currVal_2 = _co.recipeDetails.title; _ck(_v, 20, 0, currVal_2); var currVal_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).disabled || null); _ck(_v, 29, 0, currVal_3); var currVal_5 = _co.recipeDetails.likes; _ck(_v, 36, 0, currVal_5); }); }
function View_FavoriteRecipeComponentComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FavoriteRecipeComponentComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FavoriteRecipeComponentComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.detailView; _ck(_v, 3, 0, currVal_0); var currVal_1 = _co.detailView; _ck(_v, 6, 0, currVal_1); }, null); }
function View_FavoriteRecipeComponentComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-favorite-recipe-component", [], null, null, null, View_FavoriteRecipeComponentComponent_0, RenderType_FavoriteRecipeComponentComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_9__services_database_service_service__["a" /* DatabaseServiceService */], __WEBPACK_IMPORTED_MODULE_9__services_database_service_service__["a" /* DatabaseServiceService */], [__WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_11__favorite_recipe_component_component__["a" /* FavoriteRecipeComponentComponent */], [__WEBPACK_IMPORTED_MODULE_12__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_9__services_database_service_service__["a" /* DatabaseServiceService */]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var FavoriteRecipeComponentComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-favorite-recipe-component", __WEBPACK_IMPORTED_MODULE_11__favorite_recipe_component_component__["a" /* FavoriteRecipeComponentComponent */], View_FavoriteRecipeComponentComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/favorite-recipe-component/favorite-recipe-component.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteRecipeComponentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_database_service_service__ = __webpack_require__("./src/app/services/database-service.service.ts");


var FavoriteRecipeComponentComponent = /** @class */ (function () {
    function FavoriteRecipeComponentComponent(data, db) {
        this.data = data;
        this.db = db;
        this.detailView = false;
        this.recipeDetails = {};
        this.recipes = [];
    }
    FavoriteRecipeComponentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.db.getFavoriteRecipes(this.data.user).then(function (res) {
            var recipes = [];
            Object.keys(res).forEach(function (key) {
                recipes.push(res[key][0]['name']);
            });
            _this.recipes = recipes.filter(function (recipe, index, self) {
                return self.indexOf(recipe) === index;
            });
        });
    };
    FavoriteRecipeComponentComponent.prototype.detailViewToggle = function () {
        this.detailView = !this.detailView;
    };
    FavoriteRecipeComponentComponent.prototype.handleUrlChange = function (url) {
        window.open(url, '_blank');
    };
    FavoriteRecipeComponentComponent.prototype.getRecipeDetails = function (recipe) {
        var _this = this;
        this.db.getRecipe(recipe).then(function (res) {
            _this.recipeDetails = res;
            _this.detailView = true;
        });
    };
    return FavoriteRecipeComponentComponent;
}());



/***/ }),

/***/ "./src/app/followers/followers.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".pull-right[_ngcontent-%COMP%]{\n  text-align: right;\n}\n.width-full[_ngcontent-%COMP%]{\n  width: 100%;\n}\nmat-input-container[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.search-row[_ngcontent-%COMP%]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.mar-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}"];



/***/ }),

/***/ "./src/app/followers/followers.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_FollowersComponent */
/* unused harmony export View_FollowersComponent_0 */
/* unused harmony export View_FollowersComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowersComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__followers_component_css_shim_ngstyle__ = __webpack_require__("./src/app/followers/followers.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material_list__ = __webpack_require__("./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/list/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__followers_component__ = __webpack_require__("./src/app/followers/followers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




















var styles_FollowersComponent = [__WEBPACK_IMPORTED_MODULE_0__followers_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_FollowersComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_FollowersComponent, data: {} });

function View_FollowersComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 13, "div", [["class", "followers-header row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 4, "div", [["class", "header-title col-xs-10 col-sm-10 col-md-10"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Follow"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 4, "div", [["class", "header-title col-xs-2 col-sm-2 col-md-2 pull-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.switchView() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 0, "i", [["class", "fas fa-user-plus fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], null, null); }
function View_FollowersComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 50, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 8, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 5, "div", [["class", "col-xs-2 col-sm-2 col-md-2"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 2, "button", [["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.switchView() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, 0, 0, "i", [["class", "fas fa-arrow-left fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 30, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 0, "div", [["class", "col-xs-2 col-md-2"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](16, 0, null, null, 25, "form", [["class", "col-xs-8 col-md-8"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 18).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 18).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](17, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](18, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 18, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 1, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 4, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 5, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](32, 0, null, 1, 7, "input", [["class", "width-full mat-input-element mat-form-field-autofill-control"], ["formControlName", "search"], ["matInput", ""], ["placeholder", "Enter email ID"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](33, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](35, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[1, 4]], __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](44, 0, null, null, 5, "div", [["class", "row text-center search-row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](46, 0, null, null, 2, "button", [["color", "warn"], ["mat-raised-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.searchUser() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](47, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Search"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.searchForm; _ck(_v, 18, 0, currVal_8); var currVal_39 = "search"; _ck(_v, 35, 0, currVal_39); var currVal_40 = "Enter email ID"; var currVal_41 = "text"; _ck(_v, 38, 0, currVal_40, currVal_41); var currVal_43 = "warn"; _ck(_v, 47, 0, currVal_43); }, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).disabled || null); _ck(_v, 6, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassUntouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassTouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassPristine; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassDirty; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassValid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassInvalid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).ngClassPending; _ck(_v, 16, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._control.errorState; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._control.errorState; var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._canLabelFloat; var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldLabelFloat(); var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._hideControlPlaceholder(); var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._control.disabled; var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._control.focused; var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("untouched"); var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("touched"); var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("pristine"); var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("dirty"); var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("valid"); var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("invalid"); var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._shouldForward("pending"); _ck(_v, 22, 1, [currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22]); var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassUntouched; var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassTouched; var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassPristine; var currVal_26 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassDirty; var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassValid; var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassInvalid; var currVal_29 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 37).ngClassPending; var currVal_30 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._isServer; var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).id; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).placeholder; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).disabled; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).required; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).readonly; var currVal_36 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._ariaDescribedby || null); var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).errorState; var currVal_38 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38).required.toString(); _ck(_v, 32, 1, [currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38]); var currVal_42 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).disabled || null); _ck(_v, 46, 0, currVal_42); }); }
function View_FollowersComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 3, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "img", [["alt", ".."], ["class", "mat-list-avatar"], ["matListAvatar", ""], ["src", "..."]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, [[9, 4]], 0, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["b" /* MatListAvatarCssMatStyler */], [], null, null)], null, null); }
function View_FollowersComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 0, "i", [["class", "fas fa-user"]], null, null, null, null, null))], null, null); }
function View_FollowersComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 21, "mat-list-item", [["class", "mat-list-item"]], [[2, "mat-list-item-avatar", null], [2, "mat-list-item-with-avatar", null]], [[null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["c" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 8, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 9, { _avatar: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 2, 1, null, View_FollowersComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 2, 1, null, View_FollowersComponent_6)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, 1, 2, "h3", [["class", "mat-line"], ["matLine", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](12, 16384, [[8, 4]], 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["n" /* MatLine */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](13, null, [" ", " "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, 1, 5, "p", [["class", "mat-line"], ["matLine", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 16384, [[8, 4]], 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["n" /* MatLine */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](18, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](19, null, [" ", " "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n        "]))], function (_ck, _v) { var currVal_2 = !!_v.context.$implicit.img; _ck(_v, 6, 0, currVal_2); var currVal_3 = !_v.context.$implicit.img; _ck(_v, 9, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._avatar; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._avatar; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_4 = _v.context.$implicit.name; _ck(_v, 13, 0, currVal_4); var currVal_5 = _v.context.$implicit.email; _ck(_v, 19, 0, currVal_5); }); }
function View_FollowersComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 8, "div", [["class", "followers-body"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 5, "mat-list", [["class", "mat-list"]], null, null, null, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["d" /* View_MatList_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["a" /* RenderType_MatList */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["a" /* MatList */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 0, 1, null, View_FollowersComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.followers; _ck(_v, 6, 0, currVal_0); }, null); }
function View_FollowersComponent_9(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "mat-icon", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.saveFavorite() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "i", [["class", "fas fa-plus-circle fa-2x"]], null, null, null, null, null))], null, null); }
function View_FollowersComponent_10(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "mat-icon", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 1, "a", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "i", [["class", "fas fa-check-circle fa-2x"]], null, null, null, null, null))], null, null); }
function View_FollowersComponent_8(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 33, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "div", [["class", "col-xs-1 col-md-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 28, "div", [["class", "col-xs-10 col-md-10"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 25, "mat-list", [["class", "mat-list"]], null, null, null, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["d" /* View_MatList_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["a" /* RenderType_MatList */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["a" /* MatList */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, 0, 21, "mat-list-item", [["class", "mat-list-item"]], [[2, "mat-list-item-avatar", null], [2, "mat-list-item-with-avatar", null]], [[null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._handleFocus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._handleBlur() !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["c" /* View_MatListItem_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_list_typings_index_ngfactory__["b" /* RenderType_MatListItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 1097728, null, 2, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["c" /* MatListItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_11__angular_material_list__["f" /* MatNavList */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 10, { _lines: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 11, { _avatar: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 2, 1, null, View_FollowersComponent_9)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](15, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 2, 1, null, View_FollowersComponent_10)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](18, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](20, 0, null, 1, 2, "h3", [["class", "mat-line"], ["matLine", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](21, 16384, [[10, 4]], 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["n" /* MatLine */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](22, null, [" ", " "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 0, null, 1, 5, "p", [["class", "mat-line"], ["matLine", ""]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 16384, [[10, 4]], 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["n" /* MatLine */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n                "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](27, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](28, null, [" ", " "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = !_co.userAdded; _ck(_v, 15, 0, currVal_2); var currVal_3 = _co.userAdded; _ck(_v, 18, 0, currVal_3); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._avatar; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._avatar; _ck(_v, 9, 0, currVal_0, currVal_1); var currVal_4 = _co.foundUser.name; _ck(_v, 22, 0, currVal_4); var currVal_5 = _co.foundUser.email; _ck(_v, 28, 0, currVal_5); }); }
function View_FollowersComponent_11(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        \"User not found\"\n    "]))], null, null); }
function View_FollowersComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [["class", "followers-body"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_8)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_11)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.foundUser; _ck(_v, 3, 0, currVal_0); var currVal_1 = !_co.foundUser; _ck(_v, 6, 0, currVal_1); }, null); }
function View_FollowersComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 13, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FollowersComponent_7)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](12, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.viewContactView; _ck(_v, 3, 0, currVal_0); var currVal_1 = !_co.viewContactView; _ck(_v, 6, 0, currVal_1); var currVal_2 = _co.viewContactView; _ck(_v, 9, 0, currVal_2); var currVal_3 = !_co.viewContactView; _ck(_v, 12, 0, currVal_3); }, null); }
function View_FollowersComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-followers", [], null, null, null, View_FollowersComponent_0, RenderType_FollowersComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_15_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_16__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_18__followers_component__["a" /* FollowersComponent */], [__WEBPACK_IMPORTED_MODULE_19__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_19__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* FormBuilder */]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var FollowersComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-followers", __WEBPACK_IMPORTED_MODULE_18__followers_component__["a" /* FollowersComponent */], View_FollowersComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/followers/followers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");




var FollowersComponent = /** @class */ (function () {
    function FollowersComponent(dialogRef, data, authService, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.authService = authService;
        this.fb = fb;
        this.viewContactView = true;
        this.userAdded = false;
    }
    FollowersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getFollowersDetails().then(function (res) {
            if (!res) {
                _this.followers = [];
            }
            _this.followers = _this.formatFollowers(res);
        });
        this.searchForm = this.fb.group({
            search: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].email]
        });
    };
    FollowersComponent.prototype.formatFollowers = function (res) {
        return Object.keys(res).reduce(function (obj, key, index, data) {
            var tempObj = {
                name: '',
                email: ''
            };
            tempObj['name'] = res[key].name;
            tempObj['email'] = res[key].email;
            obj.push(tempObj);
            return obj;
        }, []);
    };
    FollowersComponent.prototype.searchUser = function () {
        var _this = this;
        this.authService.checkAndReturnUser(this.searchForm.getRawValue()['search']).then(function (user) {
            if (!user) {
                _this.foundUser = false;
            }
            _this.foundUser = { name: user['name'] || user['displayName'], email: user['email'] };
        });
    };
    FollowersComponent.prototype.saveFavorite = function () {
        var _this = this;
        this.authService.addFollower(this.foundUser).then(function () {
            _this.userAdded = true;
        });
    };
    FollowersComponent.prototype.switchView = function () {
        this.viewContactView = !this.viewContactView;
    };
    return FollowersComponent;
}());



/***/ }),

/***/ "./src/app/footer-component/footer-component.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".page-footer[_ngcontent-%COMP%]{\n  height: 7em;\n}\n@media(min-width: 768px){\n  .page-footer[_ngcontent-%COMP%]{\n    display: none;\n  }\n}\n.full-height[_ngcontent-%COMP%]{\n  height: 100%;\n}\nfooter[_ngcontent-%COMP%]{\n  padding: 0;\n  opacity: 0.9;\n  border: 0px;\n}\n.mat-card[_ngcontent-%COMP%] {\n  padding: 1em;\n  text-align: right;\n  border: 0px;\n}\n.badge[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}\np.title[_ngcontent-%COMP%]{\n  margin-bottom: 0px !important;\n}"];



/***/ }),

/***/ "./src/app/footer-component/footer-component.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_FooterComponentComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_FooterComponentComponent_0;
/* unused harmony export View_FooterComponentComponent_Host_0 */
/* unused harmony export FooterComponentComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_component_component_css_shim_ngstyle__ = __webpack_require__("./src/app/footer-component/footer-component.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_card_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_card__ = __webpack_require__("./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__footer_component_component__ = __webpack_require__("./src/app/footer-component/footer-component.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var styles_FooterComponentComponent = [__WEBPACK_IMPORTED_MODULE_0__footer_component_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_FooterComponentComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_FooterComponentComponent, data: {} });

function View_FooterComponentComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 38, "footer", [["class", "card-footer fixed-bottom page-footer"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 35, "mat-card", [["class", "full-height z-depth-3 mat-card"]], null, null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_card_typings_index_ngfactory__["b" /* View_MatCard_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_card_typings_index_ngfactory__["a" /* RenderType_MatCard */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_card__["a" /* MatCard */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, 0, 21, "mat-card-content", [["class", "mat-card-content"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_card__["b" /* MatCardContent */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 16, "mat-card-sub-title", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 13, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 1, "p", [["class", "title"]], [[8, "innerHTML", 1]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](16, 0, null, null, 7, "div", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](18, 0, null, null, 1, "a", [["class", "badge"], ["href", "https://play.google.com/store/apps/details?id=io.search.recipesearch&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 0, "img", [["alt", "Get it on Google Play"], ["height", "40px"], ["src", "../../assets/images/badgeFooter.jpg"], ["width", "120px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 1, "a", [["class", "badge"], ["href", "https://play.google.com/store/apps/details?id=io.search.recipesearch&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 0, "img", [["alt", "Get it on Google Play"], ["height", "60px"], ["src", "https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"], ["width", "130px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](31, 0, null, 0, 4, "div", [["class", "footer-copyright"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, null, 1, "div", [["class", "container-fluid"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 13, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).transform("StoreAvailableLabel")); _ck(_v, 13, 0, currVal_0); }); }
function View_FooterComponentComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_FooterComponentComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.hideBadges; _ck(_v, 2, 0, currVal_0); }, null); }
function View_FooterComponentComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-footer-component", [], null, null, null, View_FooterComponentComponent_0, RenderType_FooterComponentComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_7__footer_component_component__["a" /* FooterComponentComponent */], [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core_src_translate_service__["a" /* TranslateService */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var FooterComponentComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-footer-component", __WEBPACK_IMPORTED_MODULE_7__footer_component_component__["a" /* FooterComponentComponent */], View_FooterComponentComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/footer-component/footer-component.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");


var FooterComponentComponent = /** @class */ (function () {
    function FooterComponentComponent(translate) {
        this.translate = translate;
    }
    FooterComponentComponent.prototype.ngOnInit = function () {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            this.hideBadges = true;
        }
        else {
            this.hideBadges = false;
        }
    };
    return FooterComponentComponent;
}());



/***/ }),

/***/ "./src/app/google-cloud-vision.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleCloudVisionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./src/environments/environment.ts");



var GoogleCloudVisionService = /** @class */ (function () {
    function GoogleCloudVisionService(http) {
        this.http = http;
    }
    GoogleCloudVisionService.prototype.getLabels = function (base64Image) {
        var body = {
            'requests': [
                {
                    'image': {
                        'content': base64Image
                    },
                    'features': [
                        {
                            'type': 'TYPE_UNSPECIFIED',
                            'maxResults': 50
                        }, {
                            'type': 'LANDMARK_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'FACE_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'LOGO_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'LABEL_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'TEXT_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'DOCUMENT_TEXT_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'SAFE_SEARCH_DETECTION', 'maxResults': 50
                        }, {
                            'type': 'IMAGE_PROPERTIES', 'maxResults': 50
                        }, {
                            'type': 'CROP_HINTS', 'maxResults': 50
                        }, {
                            'type': 'WEB_DETECTION', 'maxResults': 50
                        }
                    ]
                }
            ]
        };
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].googleCloudVisionAPIKey, body).map(function (res) {
            return res.json();
        });
    };
    return GoogleCloudVisionService;
}());



/***/ }),

/***/ "./src/app/login/login.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["@media (min-width : 320px) {\n  .authButtonAlign[_ngcontent-%COMP%]{\n    text-align: left !important;\n    width: 100% !important;\n  }\n  .authButtonAlign[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]{\n    width: 100% !important;\n    margin-bottom: 1em;\n  }\n}\n\n@media (min-width : 480px) {\n  .authButtonAlign[_ngcontent-%COMP%]{\n    text-align: left !important;\n\n  }\n  .authButtonAlign[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]{\n    width: 100% !important;\n    margin-bottom: 1em;\n  }\n}\n\n@media  (min-width : 768px) {\n  .authButtonAlign[_ngcontent-%COMP%]{\n    text-align: left !important;\n    width: 100% !important;\n  }\n  .authButtonAlign[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]{\n    width: 100% !important;\n    margin-bottom: 1em;\n  }\n}\n@media (min-width: 768px) {\n  .authButtonAlign[_ngcontent-%COMP%]{\n    text-align: right;\n  }\n}\n.authButtonAlign[_ngcontent-%COMP%]{\n  text-align: right;\n}\n.width-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-form-field[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.mar-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}"];



/***/ }),

/***/ "./src/app/login/login.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_LoginComponent */
/* unused harmony export View_LoginComponent_0 */
/* unused harmony export View_LoginComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_component_css_shim_ngstyle__ = __webpack_require__("./src/app/login/login.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core_src_translate_store__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core_src_translate_loader__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core_src_translate_compiler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.compiler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_core_src_translate_parser__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.parser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core_src_missing_translation_handler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/missing-translation-handler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_ng4_loading_spinner__);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 


























var styles_LoginComponent = [__WEBPACK_IMPORTED_MODULE_0__login_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_LoginComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_LoginComponent, data: {} });

function View_LoginComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 3, "div", [["class", "text-center mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "h2", [], [[8, "innerHTML", 1]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 93, "form", [["class", "container"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](9, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 15, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 5, "div", [["class", "col-md-6  authButtonAlign"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 2, "button", [["color", "warn"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loginWithGoogle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](20, 0, null, null, 5, "div", [["class", "col-md-6 authButtonAlign"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 2, "button", [["color", "primary"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.loginWithFaceBook() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](28, 0, null, null, 25, "div", [["class", "row text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 22, "div", [["class", "col-md-12 width-full"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](32, 0, null, null, 19, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](33, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_10__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_11__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 1, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 4, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 5, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 6, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](42, 0, null, 1, 8, "input", [["class", "width-full mat-input-element mat-form-field-autofill-control"], ["formControlName", "login"], ["matInput", ""], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 43)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 43).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 43)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 43)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](43, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](45, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](47, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](48, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_11__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[1, 4]], __WEBPACK_IMPORTED_MODULE_10__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_12__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](55, 0, null, null, 25, "div", [["class", "row text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](57, 0, null, null, 22, "div", [["class", "col-md-12 "]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](59, 0, null, null, 19, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](60, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_10__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_11__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 8, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 9, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 10, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 11, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 12, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 13, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 14, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](69, 0, null, 1, 8, "input", [["class", "width-full mat-input-element mat-form-field-autofill-control"], ["formControlName", "password"], ["matInput", ""], ["type", "password"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](70, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](72, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](74, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](75, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_11__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[8, 4]], __WEBPACK_IMPORTED_MODULE_10__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_12__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](82, 0, null, null, 15, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](84, 0, null, null, 5, "div", [["class", "col-md-6 authButtonAlign"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](86, 0, null, null, 2, "button", [["color", "link"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onNoClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](87, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](91, 0, null, null, 5, "div", [["class", "col-md-6 authButtonAlign"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](93, 0, null, null, 2, "button", [["color", "primary"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onLoginClick(_co.authLabel) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](94, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_7__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_8 = _co.myForm; _ck(_v, 7, 0, currVal_8); var currVal_11 = "warn"; _ck(_v, 16, 0, currVal_11); var currVal_14 = "primary"; _ck(_v, 23, 0, currVal_14); var currVal_45 = "login"; _ck(_v, 45, 0, currVal_45); var currVal_46 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 48, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).transform("LoginLabel")), ""); var currVal_47 = "text"; _ck(_v, 48, 0, currVal_46, currVal_47); var currVal_78 = "password"; _ck(_v, 72, 0, currVal_78); var currVal_79 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 75, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 76).transform("PasswordLabel")), ""); var currVal_80 = "password"; _ck(_v, 75, 0, currVal_79, currVal_80); var currVal_83 = "link"; _ck(_v, 87, 0, currVal_83); var currVal_86 = !_co.myForm.valid; var currVal_87 = "primary"; _ck(_v, 94, 0, currVal_86, currVal_87); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 2, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).transform("LoginLabel")); _ck(_v, 2, 0, currVal_0); var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassUntouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassTouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassPristine; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassDirty; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassValid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassInvalid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).ngClassPending; _ck(_v, 5, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 15, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 17).transform("GoogleLoginLabel")); var currVal_10 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 16).disabled || null); _ck(_v, 15, 0, currVal_9, currVal_10); var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 22, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).transform("FacebookLoginLabel")); var currVal_13 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23).disabled || null); _ck(_v, 22, 0, currVal_12, currVal_13); var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._control.errorState; var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._control.errorState; var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._canLabelFloat; var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldLabelFloat(); var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._hideControlPlaceholder(); var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._control.disabled; var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._control.focused; var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("untouched"); var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("touched"); var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("pristine"); var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("dirty"); var currVal_26 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("valid"); var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("invalid"); var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 33)._shouldForward("pending"); _ck(_v, 32, 1, [currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28]); var currVal_29 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassUntouched; var currVal_30 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassTouched; var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassPristine; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassDirty; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassValid; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassInvalid; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).ngClassPending; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._isServer; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).id; var currVal_38 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).placeholder; var currVal_39 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).disabled; var currVal_40 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).required; var currVal_41 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).readonly; var currVal_42 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._ariaDescribedby || null); var currVal_43 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).errorState; var currVal_44 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).required.toString(); _ck(_v, 42, 1, [currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44]); var currVal_48 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._control.errorState; var currVal_49 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._control.errorState; var currVal_50 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._canLabelFloat; var currVal_51 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldLabelFloat(); var currVal_52 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._hideControlPlaceholder(); var currVal_53 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._control.disabled; var currVal_54 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._control.focused; var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("untouched"); var currVal_56 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("touched"); var currVal_57 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("pristine"); var currVal_58 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("dirty"); var currVal_59 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("valid"); var currVal_60 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("invalid"); var currVal_61 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 60)._shouldForward("pending"); _ck(_v, 59, 1, [currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61]); var currVal_62 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassUntouched; var currVal_63 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassTouched; var currVal_64 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassPristine; var currVal_65 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassDirty; var currVal_66 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassValid; var currVal_67 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassInvalid; var currVal_68 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 74).ngClassPending; var currVal_69 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75)._isServer; var currVal_70 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).id; var currVal_71 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).placeholder; var currVal_72 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).disabled; var currVal_73 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).required; var currVal_74 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).readonly; var currVal_75 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75)._ariaDescribedby || null); var currVal_76 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).errorState; var currVal_77 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 75).required.toString(); _ck(_v, 69, 1, [currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69, currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77]); var currVal_81 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 86, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 88).transform("CloseLabel")); var currVal_82 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 87).disabled || null); _ck(_v, 86, 0, currVal_81, currVal_82); var currVal_84 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 93, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 95).transform(_co.authLabel)); var currVal_85 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 94).disabled || null); _ck(_v, 93, 0, currVal_84, currVal_85); }); }
function View_LoginComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "app-login", [], null, null, null, View_LoginComponent_0, RenderType_LoginComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_13__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_13__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_15__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], [__WEBPACK_IMPORTED_MODULE_17__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core_src_translate_loader__["b" /* TranslateLoader */], __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core_src_translate_compiler__["a" /* TranslateCompiler */], __WEBPACK_IMPORTED_MODULE_20__ngx_translate_core_src_translate_parser__["b" /* TranslateParser */], __WEBPACK_IMPORTED_MODULE_21__ngx_translate_core_src_missing_translation_handler__["b" /* MissingTranslationHandler */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["b" /* USE_DEFAULT_LANG */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["c" /* USE_STORE */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_23__login_component__["a" /* LoginComponent */], [__WEBPACK_IMPORTED_MODULE_24__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_24__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_24__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_13__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_25_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_16_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_15__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */]], null, null)], function (_ck, _v) { _ck(_v, 4, 0); }, null); }
var LoginComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-login", __WEBPACK_IMPORTED_MODULE_23__login_component__["a" /* LoginComponent */], View_LoginComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_UserModel__ = __webpack_require__("./src/app/Models/UserModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");










var LoginComponent = /** @class */ (function () {
    function LoginComponent(dialogRef, registerRef, data, fb, authService, spinnerService, db, translate, route, appGlobal) {
        this.dialogRef = dialogRef;
        this.registerRef = registerRef;
        this.data = data;
        this.fb = fb;
        this.authService = authService;
        this.spinnerService = spinnerService;
        this.db = db;
        this.translate = translate;
        this.route = route;
        this.appGlobal = appGlobal;
        this.authLabel = data.authLabel;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.translate.setDefaultLang(this.data.language || this.appGlobal.defaultContent);
        this.myForm = this.fb.group({
            'login': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["s" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["s" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["s" /* Validators */].required])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["s" /* Validators */].required]
        });
    };
    LoginComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    LoginComponent.prototype.createDataBaseUserObject = function (user) {
        var userObj = {
            name: user.displayName || user.email,
            email: user.email,
            favoriteRecipes: [],
            recipes: []
        };
        return this.db.database.ref('users/' + (user.email).split('@')[0]).set(userObj).then(function (res) {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.loginWithGoogle = function () {
        var _this = this;
        this.authService.signInWithGoogle().then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            localStorage.setItem('token', result.credential);
            // The signed-in user info.
            _this.userInfo = result.user;
            var user = new __WEBPACK_IMPORTED_MODULE_2__Models_UserModel__["a" /* UserModel */]({
                login: true,
                email: result.user.email,
                displayName: result.user.displayName,
                uid: result.user.uid
            });
            _this.authService.checkiIfObjectIsThere(result.user.email).then(function (res) {
                if (!res) {
                    _this.createDataBaseUserObject(user).then(function (res) {
                        _this.dialogRef.close(user);
                    });
                }
                else {
                    _this.dialogRef.close(user);
                }
            });
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    };
    LoginComponent.prototype.loginWithFaceBook = function () {
        var _this = this;
        this.authService.signInWithFacebook().then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            localStorage.setItem('token', result.credential);
            // The signed-in user info.
            _this.userInfo = result.user;
            var user = new __WEBPACK_IMPORTED_MODULE_2__Models_UserModel__["a" /* UserModel */]({
                login: true,
                email: result.user.email,
                displayName: result.user.displayName,
                uid: result.user.uid
            });
            _this.authService.checkiIfObjectIsThere(result.user.email).then(function (res) {
                if (!res) {
                    _this.createDataBaseUserObject(user).then(function (res) {
                        _this.dialogRef.close(user);
                    });
                }
                else {
                    _this.dialogRef.close(user);
                }
            });
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    };
    LoginComponent.prototype.onLoginClick = function (authLabel) {
        var _this = this;
        this.spinnerService.show();
        var loginPassword = this.myForm.value.login + "-" + this.myForm.value.password;
        var auth;
        var error;
        if (authLabel === 'LoginLabel') {
            auth = this.authService.loginWithEmail(this.myForm.value.login, this.myForm.value.password).then(function (res) {
                localStorage.setItem('token', res);
                var user = new __WEBPACK_IMPORTED_MODULE_2__Models_UserModel__["a" /* UserModel */]({ login: true, email: _this.myForm.value.login, name: '', uid: res.uid });
                _this.dialogRef.close(user);
                _this.spinnerService.hide();
            }).catch(function (err) {
                error = err.message;
                _this.spinnerService.hide();
            });
        }
        else {
            auth = this.authService.registerWithEmail(this.myForm.value.login, this.myForm.value.password).then(function (res) {
                localStorage.setItem('token', res);
                var user = new __WEBPACK_IMPORTED_MODULE_2__Models_UserModel__["a" /* UserModel */]({ login: true, email: _this.myForm.value.login, name: '', uid: res.uid });
                _this.createDataBaseUserObject(user).then(function (res) {
                    _this.dialogRef.close(user);
                    _this.spinnerService.hide();
                });
            }).catch(function (err) {
                error = err.message;
                _this.spinnerService.hide();
            });
        }
        console.log(auth);
    };
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/my-recipes/my-recipes.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["mat-input-container[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-form-field[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.pull-right[_ngcontent-%COMP%]{\n  text-align: right;\n}"];



/***/ }),

/***/ "./src/app/my-recipes/my-recipes.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_MyRecipesComponent */
/* unused harmony export View_MyRecipesComponent_0 */
/* unused harmony export View_MyRecipesComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyRecipesComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__my_recipes_component_css_shim_ngstyle__ = __webpack_require__("./src/app/my-recipes/my-recipes.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_chips__ = __webpack_require__("./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_chips_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/chips/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__snack_bar_snack_bar_component_ngfactory__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__my_recipes_component__ = __webpack_require__("./src/app/my-recipes/my-recipes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
























var styles_MyRecipesComponent = [__WEBPACK_IMPORTED_MODULE_0__my_recipes_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_MyRecipesComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_MyRecipesComponent, data: {} });

function View_MyRecipesComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 13, "div", [["class", "recipes-header row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 4, "div", [["class", "header-title col-xs-10 col-sm-10 col-md-10"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["My Recipes"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](8, 0, null, null, 4, "div", [["class", "header-title col-xs-2 col-sm-2 col-md-2 pull-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.switchView() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 0, "i", [["class", "fas fa-plus-circle fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], null, null); }
function View_MyRecipesComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "li", [["class", "list-group-item"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit.title; _ck(_v, 1, 0, currVal_0); }); }
function View_MyRecipesComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [["class", "recipes-body"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 4, "ul", [["class", "list-group"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.myRecipes; _ck(_v, 5, 0, currVal_0); }, null); }
function View_MyRecipesComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "div", [["class", "recipes-header row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 4, "div", [["class", "header-title col-xs-2 col-sm-2 col-md-2 pull-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.switchView() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 0, "i", [["class", "fas fa-arrow-left fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], null, null); }
function View_MyRecipesComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "mat-icon", [["class", "mat-chip-remove"], ["matChipRemove", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["d" /* MatChipRemove */], [__WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["a" /* MatChip */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "i", [["class", "far fa-times-circle"]], null, null, null, null, null))], null, null); }
function View_MyRecipesComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 5, "mat-chip", [["class", "mat-chip"], ["role", "option"]], [[1, "tabindex", 0], [2, "mat-chip-selected", null], [1, "disabled", 0], [1, "aria-disabled", 0], [1, "aria-selected", 0]], [[null, "remove"], [null, "click"], [null, "keydown"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleClick($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("focus" === en)) {
        var pd_2 = ((__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._hasFocus = true) !== false);
        ad = (pd_2 && ad);
    } if (("blur" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._blur() !== false);
        ad = (pd_3 && ad);
    } if (("remove" === en)) {
        var pd_4 = (_co.removeDietLabel(_v.context.$implicit) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 147456, [[23, 4]], 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["a" /* MatChip */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { selectable: [0, "selectable"], removable: [1, "removable"] }, { onRemove: "remove" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](2, null, ["\n              ", "\n              "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_7)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_5 = _co.selectable; var currVal_6 = _co.removable; _ck(_v, 1, 0, currVal_5, currVal_6); var currVal_8 = _co.removable; _ck(_v, 4, 0, currVal_8); }, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled ? null : (0 - 1)); var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).selected; var currVal_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled.toString(); var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).ariaSelected; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_7 = _v.context.$implicit; _ck(_v, 2, 0, currVal_7); }); }
function View_MyRecipesComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 145, "div", [["class", "recipes-body row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "div", [["class", "col-xs-2 col-md-2"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 140, "div", [["class", "col-xs-8 col-md-8"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 130, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 8).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 8).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 21, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 18, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](15, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 4, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 5, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 6, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 8, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "title"], ["matInput", ""], ["placeholder", "Title"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 25)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](29, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](30, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[2, 4]], __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, null, 21, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](37, 0, null, null, 18, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 9, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 10, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 11, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 12, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 13, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 14, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 15, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](47, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "recipeUrl"], ["matInput", ""], ["placeholder", "Recipe Url"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 48)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](48, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](50, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](52, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](53, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[9, 4]], __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](58, 0, null, null, 29, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](60, 0, null, null, 26, "mat-form-field", [["class", "demo-chip-list mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](61, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 16, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 17, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 18, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 19, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 20, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 21, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 22, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](70, 0, null, 1, 15, "mat-chip-list", [["class", "mat-chip-list"]], [[1, "tabindex", 0], [1, "aria-describedby", 0], [1, "aria-required", 0], [1, "aria-disabled", 0], [1, "aria-invalid", 0], [1, "aria-multiselectable", 0], [1, "role", 0], [2, "mat-chip-list-disabled", null], [2, "mat-chip-list-invalid", null], [2, "mat-chip-list-required", null], [1, "aria-orientation", 0]], [[null, "focus"], [null, "blur"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).focus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._blur() !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._keydown($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_chips_typings_index_ngfactory__["b" /* View_MatChipList_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_chips_typings_index_ngfactory__["a" /* RenderType_MatChipList */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](71, 1556480, [["chipList", 4]], 1, __WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["c" /* MatChipList */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_11__angular_cdk_bidi__["c" /* Directionality */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 23, { chips: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[16, 4]], __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["c" /* MatChipList */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 0, 1, null, View_MyRecipesComponent_6)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](76, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](78, 0, null, 0, 6, "input", [["class", "mat-chip-input mat-input-element"], ["formControlName", "dietLabels"], ["placeholder", "Diet labels"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "matChipInputTokenEnd"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "keydown"], [null, "focus"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("keydown" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 84)._keydown($event) !== false);
        ad = (pd_4 && ad);
    } if (("blur" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 84)._blur() !== false);
        ad = (pd_5 && ad);
    } if (("focus" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 84)._focus() !== false);
        ad = (pd_6 && ad);
    } if (("input" === en)) {
        var pd_7 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 84)._onInput() !== false);
        ad = (pd_7 && ad);
    } if (("matChipInputTokenEnd" === en)) {
        var pd_8 = (_co.addDietLabel($event) !== false);
        ad = (pd_8 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](79, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](81, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](83, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](84, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_chips__["b" /* MatChipInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { chipList: [0, "chipList"], separatorKeyCodes: [1, "separatorKeyCodes"], placeholder: [2, "placeholder"] }, { chipEnd: "matChipInputTokenEnd" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](89, 0, null, null, 22, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](91, 0, null, null, 19, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](92, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 24, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 25, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 26, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 27, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 28, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 29, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 30, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](101, 0, null, 1, 8, "textarea", [["class", "mat-input-element mat-form-field-autofill-control mat-autosize"], ["formControlName", "ingredients"], ["matAutosizeMaxRows", "20"], ["matAutosizeMinRows", "2"], ["matInput", ""], ["matTextareaAutosize", ""], ["placeholder", "Ingredients"], ["rows", "1"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 102)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 102).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 102)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 102)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](102, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](104, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](106, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](107, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](108, 4603904, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["d" /* MatTextareaAutosize */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]], { minRows: [0, "minRows"], maxRows: [1, "maxRows"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[24, 4]], __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](113, 0, null, null, 22, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](115, 0, null, null, 19, "mat-input-container", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_5__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](116, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 31, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 32, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 33, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 34, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 35, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 36, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 37, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](125, 0, null, 1, 8, "textarea", [["class", "mat-input-element mat-form-field-autofill-control mat-autosize"], ["formControlName", "instructions"], ["matAutosizeMaxRows", "20"], ["matAutosizeMinRows", "2"], ["matInput", ""], ["matTextareaAutosize", ""], ["placeholder", "Instructions"], ["rows", "1"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 126)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 126).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 126)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 126)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](126, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](128, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](130, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](131, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_7__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](132, 4603904, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_material_input__["d" /* MatTextareaAutosize */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]], { minRows: [0, "minRows"], maxRows: [1, "maxRows"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[31, 4]], __WEBPACK_IMPORTED_MODULE_6__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](138, 0, null, null, 5, "div", [["class", "row mar-bottom"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](140, 0, null, null, 2, "button", [["color", "primary"], ["mat-raised-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.saveRecipe() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](141, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Save"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.myRecipeForm; _ck(_v, 8, 0, currVal_7); var currVal_38 = "title"; _ck(_v, 27, 0, currVal_38); var currVal_39 = "Title"; var currVal_40 = "text"; _ck(_v, 30, 0, currVal_39, currVal_40); var currVal_71 = "recipeUrl"; _ck(_v, 50, 0, currVal_71); var currVal_72 = "Recipe Url"; var currVal_73 = "text"; _ck(_v, 53, 0, currVal_72, currVal_73); _ck(_v, 71, 0); var currVal_99 = _co.dietLabels; _ck(_v, 76, 0, currVal_99); var currVal_107 = "dietLabels"; _ck(_v, 81, 0, currVal_107); var currVal_108 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71); var currVal_109 = _co.separatorKeysCodes; var currVal_110 = "Diet labels"; _ck(_v, 84, 0, currVal_108, currVal_109, currVal_110); var currVal_141 = "ingredients"; _ck(_v, 104, 0, currVal_141); var currVal_142 = "Ingredients"; _ck(_v, 107, 0, currVal_142); var currVal_143 = "2"; var currVal_144 = "20"; _ck(_v, 108, 0, currVal_143, currVal_144); var currVal_175 = "instructions"; _ck(_v, 128, 0, currVal_175); var currVal_176 = "Instructions"; var currVal_177 = "text"; _ck(_v, 131, 0, currVal_176, currVal_177); var currVal_178 = "2"; var currVal_179 = "20"; _ck(_v, 132, 0, currVal_178, currVal_179); var currVal_181 = !_co.myRecipeForm.valid; var currVal_182 = "primary"; _ck(_v, 141, 0, currVal_181, currVal_182); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPending; _ck(_v, 6, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._control.errorState; var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._control.errorState; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._canLabelFloat; var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldLabelFloat(); var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._hideControlPlaceholder(); var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._control.disabled; var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._control.focused; var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("untouched"); var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("touched"); var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("pristine"); var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("dirty"); var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("valid"); var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("invalid"); var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._shouldForward("pending"); _ck(_v, 14, 1, [currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21]); var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassUntouched; var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassTouched; var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassPristine; var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassDirty; var currVal_26 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassValid; var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassInvalid; var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).ngClassPending; var currVal_29 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30)._isServer; var currVal_30 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).id; var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).placeholder; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).disabled; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).required; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).readonly; var currVal_35 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30)._ariaDescribedby || null); var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).errorState; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).required.toString(); _ck(_v, 24, 1, [currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37]); var currVal_41 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._control.errorState; var currVal_42 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._control.errorState; var currVal_43 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._canLabelFloat; var currVal_44 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldLabelFloat(); var currVal_45 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._hideControlPlaceholder(); var currVal_46 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._control.disabled; var currVal_47 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._control.focused; var currVal_48 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("untouched"); var currVal_49 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("touched"); var currVal_50 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("pristine"); var currVal_51 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("dirty"); var currVal_52 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("valid"); var currVal_53 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("invalid"); var currVal_54 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 38)._shouldForward("pending"); _ck(_v, 37, 1, [currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48, currVal_49, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54]); var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassUntouched; var currVal_56 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassTouched; var currVal_57 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassPristine; var currVal_58 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassDirty; var currVal_59 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassValid; var currVal_60 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassInvalid; var currVal_61 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 52).ngClassPending; var currVal_62 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53)._isServer; var currVal_63 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).id; var currVal_64 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).placeholder; var currVal_65 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).disabled; var currVal_66 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).required; var currVal_67 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).readonly; var currVal_68 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53)._ariaDescribedby || null); var currVal_69 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).errorState; var currVal_70 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 53).required.toString(); _ck(_v, 47, 1, [currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64, currVal_65, currVal_66, currVal_67, currVal_68, currVal_69, currVal_70]); var currVal_74 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._control.errorState; var currVal_75 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._control.errorState; var currVal_76 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._canLabelFloat; var currVal_77 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldLabelFloat(); var currVal_78 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._hideControlPlaceholder(); var currVal_79 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._control.disabled; var currVal_80 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._control.focused; var currVal_81 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("untouched"); var currVal_82 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("touched"); var currVal_83 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("pristine"); var currVal_84 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("dirty"); var currVal_85 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("valid"); var currVal_86 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("invalid"); var currVal_87 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 61)._shouldForward("pending"); _ck(_v, 60, 1, [currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80, currVal_81, currVal_82, currVal_83, currVal_84, currVal_85, currVal_86, currVal_87]); var currVal_88 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._tabIndex; var currVal_89 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._ariaDescribedby || null); var currVal_90 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).required.toString(); var currVal_91 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).disabled.toString(); var currVal_92 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).errorState; var currVal_93 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).multiple; var currVal_94 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).role; var currVal_95 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).disabled; var currVal_96 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).errorState; var currVal_97 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).required; var currVal_98 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).ariaOrientation; _ck(_v, 70, 1, [currVal_88, currVal_89, currVal_90, currVal_91, currVal_92, currVal_93, currVal_94, currVal_95, currVal_96, currVal_97, currVal_98]); var currVal_100 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassUntouched; var currVal_101 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassTouched; var currVal_102 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassPristine; var currVal_103 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassDirty; var currVal_104 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassValid; var currVal_105 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassInvalid; var currVal_106 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).ngClassPending; _ck(_v, 78, 0, currVal_100, currVal_101, currVal_102, currVal_103, currVal_104, currVal_105, currVal_106); var currVal_111 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._control.errorState; var currVal_112 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._control.errorState; var currVal_113 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._canLabelFloat; var currVal_114 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldLabelFloat(); var currVal_115 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._hideControlPlaceholder(); var currVal_116 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._control.disabled; var currVal_117 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._control.focused; var currVal_118 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("untouched"); var currVal_119 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("touched"); var currVal_120 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("pristine"); var currVal_121 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("dirty"); var currVal_122 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("valid"); var currVal_123 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("invalid"); var currVal_124 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 92)._shouldForward("pending"); _ck(_v, 91, 1, [currVal_111, currVal_112, currVal_113, currVal_114, currVal_115, currVal_116, currVal_117, currVal_118, currVal_119, currVal_120, currVal_121, currVal_122, currVal_123, currVal_124]); var currVal_125 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassUntouched; var currVal_126 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassTouched; var currVal_127 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassPristine; var currVal_128 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassDirty; var currVal_129 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassValid; var currVal_130 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassInvalid; var currVal_131 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 106).ngClassPending; var currVal_132 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107)._isServer; var currVal_133 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).id; var currVal_134 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).placeholder; var currVal_135 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).disabled; var currVal_136 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).required; var currVal_137 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).readonly; var currVal_138 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107)._ariaDescribedby || null); var currVal_139 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).errorState; var currVal_140 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 107).required.toString(); _ck(_v, 101, 1, [currVal_125, currVal_126, currVal_127, currVal_128, currVal_129, currVal_130, currVal_131, currVal_132, currVal_133, currVal_134, currVal_135, currVal_136, currVal_137, currVal_138, currVal_139, currVal_140]); var currVal_145 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._control.errorState; var currVal_146 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._control.errorState; var currVal_147 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._canLabelFloat; var currVal_148 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldLabelFloat(); var currVal_149 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._hideControlPlaceholder(); var currVal_150 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._control.disabled; var currVal_151 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._control.focused; var currVal_152 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("untouched"); var currVal_153 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("touched"); var currVal_154 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("pristine"); var currVal_155 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("dirty"); var currVal_156 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("valid"); var currVal_157 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("invalid"); var currVal_158 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 116)._shouldForward("pending"); _ck(_v, 115, 1, [currVal_145, currVal_146, currVal_147, currVal_148, currVal_149, currVal_150, currVal_151, currVal_152, currVal_153, currVal_154, currVal_155, currVal_156, currVal_157, currVal_158]); var currVal_159 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassUntouched; var currVal_160 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassTouched; var currVal_161 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassPristine; var currVal_162 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassDirty; var currVal_163 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassValid; var currVal_164 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassInvalid; var currVal_165 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 130).ngClassPending; var currVal_166 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131)._isServer; var currVal_167 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).id; var currVal_168 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).placeholder; var currVal_169 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).disabled; var currVal_170 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).required; var currVal_171 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).readonly; var currVal_172 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131)._ariaDescribedby || null); var currVal_173 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).errorState; var currVal_174 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 131).required.toString(); _ck(_v, 125, 1, [currVal_159, currVal_160, currVal_161, currVal_162, currVal_163, currVal_164, currVal_165, currVal_166, currVal_167, currVal_168, currVal_169, currVal_170, currVal_171, currVal_172, currVal_173, currVal_174]); var currVal_180 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 141).disabled || null); _ck(_v, 140, 0, currVal_180); }); }
function View_MyRecipesComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 1, { snackBarRef: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 16, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_MyRecipesComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](13, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 1, "app-snack-bar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_15__snack_bar_snack_bar_component_ngfactory__["b" /* View_SnackBarComponent_0 */], __WEBPACK_IMPORTED_MODULE_15__snack_bar_snack_bar_component_ngfactory__["a" /* RenderType_SnackBarComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 114688, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_16__snack_bar_snack_bar_component__["a" /* SnackBarComponent */], [__WEBPACK_IMPORTED_MODULE_17__angular_material_snack_bar__["b" /* MatSnackBar */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.viewRecipeView; _ck(_v, 4, 0, currVal_0); var currVal_1 = _co.viewRecipeView; _ck(_v, 7, 0, currVal_1); var currVal_2 = !_co.viewRecipeView; _ck(_v, 10, 0, currVal_2); var currVal_3 = !_co.viewRecipeView; _ck(_v, 13, 0, currVal_3); _ck(_v, 16, 0); }, null); }
function View_MyRecipesComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-my-recipes", [], null, null, null, View_MyRecipesComponent_0, RenderType_MyRecipesComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_19_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_20__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_21_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_22__my_recipes_component__["a" /* MyRecipesComponent */], [__WEBPACK_IMPORTED_MODULE_23__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_23__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormBuilder */]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var MyRecipesComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-my-recipes", __WEBPACK_IMPORTED_MODULE_22__my_recipes_component__["a" /* MyRecipesComponent */], View_MyRecipesComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/my-recipes/my-recipes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyRecipesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__ = __webpack_require__("./node_modules/@angular/cdk/esm5/keycodes.es5.js");






var MyRecipesComponent = /** @class */ (function () {
    function MyRecipesComponent(dialogRef, data, authService, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.authService = authService;
        this.fb = fb;
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [__WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__["g" /* ENTER */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_keycodes__["c" /* COMMA */]];
        this.myRecipes = [];
        this.viewRecipeView = true;
        this.noRecipesFound = false;
        this.dietLabels = [];
    }
    MyRecipesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getMyRecipeDetails().then(function (recipes) {
            if (!recipes) {
                _this.noRecipesFound = true;
            }
            else {
                _this.myRecipes = _this.formatRecipes(recipes);
            }
        });
        this.myRecipeForm = this.fb.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].required],
            recipeUrl: [''],
            dietLabels: [[]],
            ingredients: [],
            instructions: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].required]
        });
    };
    MyRecipesComponent.prototype.formatRecipes = function (recipes) {
        return Object.keys(recipes).reduce(function (recipesObj, key, index, data) {
            recipesObj.push(recipes[key]);
            return recipesObj;
        }, []);
    };
    MyRecipesComponent.prototype.removeDietLabel = function (label) {
    };
    MyRecipesComponent.prototype.addDietLabel = function (event) {
        var input = event.input;
        var value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.dietLabels.push(value.trim());
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.myRecipeForm.setValue({ 'dietLabels': this.dietLabels });
    };
    MyRecipesComponent.prototype.switchView = function () {
        this.viewRecipeView = !this.viewRecipeView;
    };
    MyRecipesComponent.prototype.saveRecipe = function () {
        var _this = this;
        this.authService.saveMyRecipe(this.myRecipeForm.getRawValue()).then(function () {
            _this.snackBarRef.openSnackBar('Recipe saved');
        });
    };
    return MyRecipesComponent;
}());



/***/ }),

/***/ "./src/app/notification-menu/notification-menu.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".pad-left[_ngcontent-%COMP%]{\n  padding-left: 1em;\n}\n.mar-top[_ngcontent-%COMP%]{\n  margin-top: 2em;\n}"];



/***/ }),

/***/ "./src/app/notification-menu/notification-menu.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_NotificationMenuComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_NotificationMenuComponent_0;
/* unused harmony export View_NotificationMenuComponent_Host_0 */
/* unused harmony export NotificationMenuComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_menu_component_css_shim_ngstyle__ = __webpack_require__("./src/app/notification-menu/notification-menu.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_menu_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/menu/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__ = __webpack_require__("./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_overlay__ = __webpack_require__("./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notification_menu_component__ = __webpack_require__("./src/app/notification-menu/notification-menu.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 









var styles_NotificationMenuComponent = [__WEBPACK_IMPORTED_MODULE_0__notification_menu_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_NotificationMenuComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_NotificationMenuComponent, data: {} });

function View_NotificationMenuComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "button", [["class", "mat-menu-item"], ["mat-menu-item", ""], ["role", "menuitem"]], [[2, "mat-menu-item-highlighted", null], [2, "mat-menu-item-submenu-trigger", null], [1, "tabindex", 0], [1, "aria-disabled", 0], [1, "disabled", 0]], [[null, "click"], [null, "mouseenter"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._checkDisabled($event) !== false);
        ad = (pd_0 && ad);
    } if (("mouseenter" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._emitHoverEvent() !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_menu_typings_index_ngfactory__["c" /* View_MatMenuItem_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_menu_typings_index_ngfactory__["b" /* RenderType_MatMenuItem */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["d" /* MatMenuItem */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](2, 0, ["", ""]))], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._highlighted; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._triggersSubmenu; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._getTabIndex(); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled.toString(); var currVal_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_5 = _v.context.$implicit.title; _ck(_v, 2, 0, currVal_5); }); }
function View_NotificationMenuComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 16777216, null, null, 2, "a", [["aria-haspopup", "true"], ["class", "pad-left"]], null, [[null, "mousedown"], [null, "keydown"], [null, "click"]], function (_v, en, $event) { var ad = true; if (("mousedown" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleMousedown($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("click" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleClick($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 1196032, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["f" /* MatMenuTrigger */], [__WEBPACK_IMPORTED_MODULE_6__angular_cdk_overlay__["b" /* Overlay */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["b" /* MAT_MENU_SCROLL_STRATEGY */], [2, __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["c" /* MatMenu */]], [8, null], [2, __WEBPACK_IMPORTED_MODULE_7__angular_cdk_bidi__["c" /* Directionality */]], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { menu: [0, "menu"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "i", [["class", "fas fa-bell fa-2x "]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 7, "mat-menu", [["class", "mar-top"]], null, null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_menu_typings_index_ngfactory__["d" /* View_MatMenu_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_menu_typings_index_ngfactory__["a" /* RenderType_MatMenu */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 1228800, [["menu", 4]], 2, __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["c" /* MatMenu */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_3__angular_material_menu__["a" /* MAT_MENU_DEFAULT_OPTIONS */]], { panelClass: [0, "panelClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 1, { items: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 0, 1, null, View_NotificationMenuComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_4__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5); _ck(_v, 1, 0, currVal_0); var currVal_1 = "mar-top"; _ck(_v, 5, 0, currVal_1); var currVal_2 = _co.notifications; _ck(_v, 10, 0, currVal_2); }, null); }
function View_NotificationMenuComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-notification-menu", [], null, null, null, View_NotificationMenuComponent_0, RenderType_NotificationMenuComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_8__notification_menu_component__["a" /* NotificationMenuComponent */], [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var NotificationMenuComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-notification-menu", __WEBPACK_IMPORTED_MODULE_8__notification_menu_component__["a" /* NotificationMenuComponent */], View_NotificationMenuComponent_Host_0, { notifications: "notifications" }, {}, []);



/***/ }),

/***/ "./src/app/notification-menu/notification-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var NotificationMenuComponent = /** @class */ (function () {
    function NotificationMenuComponent() {
    }
    NotificationMenuComponent.prototype.ngOnInit = function () {
    };
    return NotificationMenuComponent;
}());



/***/ }),

/***/ "./src/app/nutrient-dialog/nutrient-dialog.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/nutrient-dialog/nutrient-dialog.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RenderType_NutrientDialogComponent; });
/* harmony export (immutable) */ __webpack_exports__["c"] = View_NutrientDialogComponent_0;
/* unused harmony export View_NutrientDialogComponent_Host_0 */
/* unused harmony export NutrientDialogComponentNgFactory */
/* unused harmony export RenderType_NutrientDialogTemplate */
/* unused harmony export View_NutrientDialogTemplate_0 */
/* unused harmony export View_NutrientDialogTemplate_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NutrientDialogTemplateNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nutrient_dialog_component_css_shim_ngstyle__ = __webpack_require__("./src/app/nutrient-dialog/nutrient-dialog.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nutrient_dialog_component__ = __webpack_require__("./src/app/nutrient-dialog/nutrient-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 









var styles_NutrientDialogComponent = [__WEBPACK_IMPORTED_MODULE_0__nutrient_dialog_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_NutrientDialogComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_NutrientDialogComponent, data: {} });

function View_NutrientDialogComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 3, "button", [["class", "btn btn-danger mar-right "], ["mat-raised-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openDialog() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["info_outline"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], null, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); _ck(_v, 0, 0, currVal_0); }); }
function View_NutrientDialogComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-nutrient-dialog", [], null, null, null, View_NutrientDialogComponent_0, RenderType_NutrientDialogComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_6__nutrient_dialog_component__["a" /* NutrientDialogComponent */], [__WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["e" /* MatDialog */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var NutrientDialogComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-nutrient-dialog", __WEBPACK_IMPORTED_MODULE_6__nutrient_dialog_component__["a" /* NutrientDialogComponent */], View_NutrientDialogComponent_Host_0, { nutrients: "nutrients" }, {}, []);

var styles_NutrientDialogTemplate = [];
var RenderType_NutrientDialogTemplate = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 2, styles: styles_NutrientDialogTemplate, data: {} });

function View_NutrientDialogTemplate_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "li", [["class", "list-group-item"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["\n    ", "\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "span", [["class", "badge"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](3, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit[0]; _ck(_v, 1, 0, currVal_0); var currVal_1 = _v.context.$implicit[1]; _ck(_v, 3, 0, currVal_1); }); }
function View_NutrientDialogTemplate_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 5, "ul", [["class", "list-group"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 2, null, View_NutrientDialogTemplate_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["s" /* SlicePipe */], []), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 5, "div", [["class", "text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 2, "button", [["color", "warn"], ["mat-raised-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onNoClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Close"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 3, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).transform(_co.data.nutrient, 0, 10)); _ck(_v, 3, 0, currVal_0); var currVal_2 = "warn"; _ck(_v, 10, 0, currVal_2); }, function (_ck, _v) { var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).disabled || null); _ck(_v, 9, 0, currVal_1); }); }
function View_NutrientDialogTemplate_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-nutrient-dialog-template", [], null, null, null, View_NutrientDialogTemplate_0, RenderType_NutrientDialogTemplate)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_6__nutrient_dialog_component__["b" /* NutrientDialogTemplate */], [__WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_7__angular_material_dialog__["a" /* MAT_DIALOG_DATA */]], null, null)], null, null); }
var NutrientDialogTemplateNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-nutrient-dialog-template", __WEBPACK_IMPORTED_MODULE_6__nutrient_dialog_component__["b" /* NutrientDialogTemplate */], View_NutrientDialogTemplate_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/nutrient-dialog/nutrient-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NutrientDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NutrientDialogTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");


var NutrientDialogComponent = /** @class */ (function () {
    function NutrientDialogComponent(dialog) {
        this.dialog = dialog;
    }
    NutrientDialogComponent.prototype.ngOnInit = function () {
    };
    NutrientDialogComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(NutrientDialogTemplate, {
            width: '200em',
            data: { nutrient: this.nutrients }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    return NutrientDialogComponent;
}());

var NutrientDialogTemplate = /** @class */ (function () {
    function NutrientDialogTemplate(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    NutrientDialogTemplate.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return NutrientDialogTemplate;
}());



/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".input-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n  color: teal;\n  font-size: 3em;\n\n}\n.width-full[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.pad-left[_ngcontent-%COMP%]{\n  padding-left: 1em;\n}\n.deep-purple[_ngcontent-%COMP%]{\n  color: #5E42B0;\n}\n.jumbotron[_ngcontent-%COMP%] {\n  padding: 1rem 2rem 1rem 1rem !important;\n  background-image: url('header.7971399dfecc5b1b0997.svg');\n  background-blend-mode: overlay;\n}\n.mat-drawer[_ngcontent-%COMP%]{\n  left: 0 !important;\n}\n.fullHeight[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n.badge[_ngcontent-%COMP%]{\n  text-align: right;\n}\n@media (max-width:  768px) {\n  .badge[_ngcontent-%COMP%]{\n    display: none;\n  }\n}\n.pad-top[_ngcontent-%COMP%]{\n  padding-top: 0.6em;\n}\n@media(min-width: 1000px){\n   .mar-left[_ngcontent-%COMP%]{\n     margin-left: 1.5em;\n   }\n}\n@media(min-width: 1435px){\n  .mar-left[_ngcontent-%COMP%]{\n    margin-left: 6em;\n  }\n}\n@media (min-width: 1025px){\n  .mar-left[_ngcontent-%COMP%]{\n    margin-left: 2em;\n  }\n}"];



/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_RecipeSearchComponent */
/* unused harmony export View_RecipeSearchComponent_0 */
/* unused harmony export View_RecipeSearchComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeSearchComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recipe_search_component_css_shim_ngstyle__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/sidenav/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__ = __webpack_require__("./node_modules/@angular/material/esm5/sidenav.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__side_nav_side_nav_component_ngfactory__ = __webpack_require__("./src/app/side-nav/side-nav.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core_src_translate_store__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core_src_translate_loader__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core_src_translate_compiler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.compiler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_parser__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.parser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_missing_translation_handler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/missing-translation-handler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__side_nav_side_nav_component__ = __webpack_require__("./src/app/side-nav/side-nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__notification_menu_notification_menu_component_ngfactory__ = __webpack_require__("./src/app/notification-menu/notification-menu.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__notification_menu_notification_menu_component__ = __webpack_require__("./src/app/notification-menu/notification-menu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__search_search_component_ngfactory__ = __webpack_require__("./src/app/search/search.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__google_cloud_vision_service__ = __webpack_require__("./src/app/google-cloud-vision.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__search_search_component__ = __webpack_require__("./src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__view_recipe_view_recipe_component_ngfactory__ = __webpack_require__("./src/app/view-recipe/view-recipe.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_database_service_service__ = __webpack_require__("./src/app/services/database-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__view_recipe_view_recipe_component__ = __webpack_require__("./src/app/view-recipe/view-recipe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__recipe_search_component__ = __webpack_require__("./src/app/recipe-search/recipe-search.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 







































var styles_RecipeSearchComponent = [__WEBPACK_IMPORTED_MODULE_0__recipe_search_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_RecipeSearchComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_RecipeSearchComponent, data: {} });

function View_RecipeSearchComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "div", [["class", "col-xl-9 col-md-8 col-lg-9 text-right mar-left pad-top"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "a", [["class", "badge"], ["href", "https://play.google.com/store/apps/details?id=io.search.recipesearch&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 0, "img", [["alt", "Get it on Google Play"], ["height", "40px"], ["src", "../../assets/images/badgeFooter.jpg"], ["width", "120px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "]))], null, null); }
function View_RecipeSearchComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "div", [["class", "col-xs-2"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 1, "a", [["class", "badge"], ["href", "https://play.google.com/store/apps/details?id=io.search.recipesearch&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 0, "img", [["alt", "Get it on Google Play"], ["height", "60px"], ["src", "https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"], ["width", "130px"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "]))], null, null); }
function View_RecipeSearchComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "h2", [["class", "input-bottom page-header"]], [[8, "innerHTML", 1]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 0, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).transform("pageTitle")); _ck(_v, 0, 0, currVal_0); }); }
function View_RecipeSearchComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 68, "div", [["class", "width-full"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 65, "mat-sidenav-container", [["class", "mat-drawer-container mat-sidenav-container"]], null, null, null, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["d" /* View_MatSidenavContainer_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["b" /* RenderType_MatSidenavContainer */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_5__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](4, { "jumbotron": 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 1490944, null, 2, __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__["f" /* MatSidenavContainer */], [[2, __WEBPACK_IMPORTED_MODULE_7__angular_cdk_bidi__["c" /* Directionality */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__["a" /* MAT_DRAWER_DEFAULT_AUTOSIZE */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 1, { _drawers: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _content: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, 0, 8, "mat-sidenav", [["class", "mat-drawer mat-sidenav"], ["mode", "push"], ["tabIndex", "-1"]], [[40, "@transform", 0], [1, "align", 0], [2, "mat-drawer-end", null], [2, "mat-drawer-over", null], [2, "mat-drawer-push", null], [2, "mat-drawer-side", null], [2, "mat-sidenav-fixed", null], [4, "top", "px"], [4, "bottom", "px"]], [[null, "openedChange"], ["component", "@transform.start"], ["component", "@transform.done"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("component:@transform.start" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._onAnimationStart($event) !== false);
        ad = (pd_0 && ad);
    } if (("component:@transform.done" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._onAnimationEnd($event) !== false);
        ad = (pd_1 && ad);
    } if (("openedChange" === en)) {
        var pd_2 = ((_co.opened = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["f" /* View_MatSidenav_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["a" /* RenderType_MatSidenav */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 3325952, [[1, 4], ["sidenav", 4]], 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__["e" /* MatSidenav */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["k" /* FocusTrapFactory */], __WEBPACK_IMPORTED_MODULE_8__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_9__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], [2, __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DOCUMENT */]]], { mode: [0, "mode"], opened: [1, "opened"] }, { openedChange: "openedChange" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, 0, 4, "app-side-nav", [], null, [[null, "userInfo"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("userInfo" === en)) {
        var pd_0 = (_co.setUserInfo($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__side_nav_side_nav_component_ngfactory__["b" /* View_SideNavComponent_0 */], __WEBPACK_IMPORTED_MODULE_10__side_nav_side_nav_component_ngfactory__["a" /* RenderType_SideNavComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], [__WEBPACK_IMPORTED_MODULE_11__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core_src_translate_loader__["b" /* TranslateLoader */], __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core_src_translate_compiler__["a" /* TranslateCompiler */], __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core_src_translate_parser__["b" /* TranslateParser */], __WEBPACK_IMPORTED_MODULE_15__ngx_translate_core_src_missing_translation_handler__["b" /* MissingTranslationHandler */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["b" /* USE_DEFAULT_LANG */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["c" /* USE_STORE */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_18__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](16, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_21__side_nav_side_nav_component__["a" /* SideNavComponent */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_22__angular_material_dialog__["e" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_18__angular_router__["a" /* ActivatedRoute */]], { user: [0, "user"] }, { userInfo: "userInfo" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, 1, 47, "mat-sidenav-content", [["class", "mat-drawer-content mat-sidenav-content"]], [[4, "margin-left", "px"], [4, "margin-right", "px"]], null, null, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["e" /* View_MatSidenavContent_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_sidenav_typings_index_ngfactory__["c" /* RenderType_MatSidenavContent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 1097728, [[2, 4]], 0, __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__["g" /* MatSidenavContent */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_6__angular_material_sidenav__["f" /* MatSidenavContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, 0, 33, "div", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_5__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](24, { "pad-top": 0, "jumbotron": 1, "fullHeight": 2 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](26, 0, null, null, 16, "div", [["class", "row "]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](28, 0, null, null, 7, "div", [["class", "col-sm-1 pad-top deep-purple"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](31, 0, null, null, 0, "i", [["class", "fas fa-bars fa-2x"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, null, 1, "app-notification-menu", [], null, null, null, __WEBPACK_IMPORTED_MODULE_24__notification_menu_notification_menu_component_ngfactory__["b" /* View_NotificationMenuComponent_0 */], __WEBPACK_IMPORTED_MODULE_24__notification_menu_notification_menu_component_ngfactory__["a" /* RenderType_NotificationMenuComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_25__notification_menu_notification_menu_component__["a" /* NotificationMenuComponent */], [], { notifications: [0, "notifications"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_RecipeSearchComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](38, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_5__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_RecipeSearchComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](41, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_5__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](44, 0, null, null, 10, "div", [["class", "text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_RecipeSearchComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](47, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_5__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](49, 0, null, null, 4, "app-search", [], null, [[null, "sendRecipes"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("sendRecipes" === en)) {
        var pd_0 = (_co.sendRecipes($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_26__search_search_component_ngfactory__["b" /* View_SearchComponent_0 */], __WEBPACK_IMPORTED_MODULE_26__search_search_component_ngfactory__["a" /* RenderType_SearchComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](4608, null, __WEBPACK_IMPORTED_MODULE_27__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_27__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_28__google_cloud_vision_service__["a" /* GoogleCloudVisionService */], __WEBPACK_IMPORTED_MODULE_28__google_cloud_vision_service__["a" /* GoogleCloudVisionService */], [__WEBPACK_IMPORTED_MODULE_29__angular_http__["d" /* Http */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](53, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_30__search_search_component__["a" /* SearchComponent */], [__WEBPACK_IMPORTED_MODULE_31__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_28__google_cloud_vision_service__["a" /* GoogleCloudVisionService */]], null, { sendRecipes: "sendRecipes" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](57, 0, null, 0, 8, "div", [], [[8, "hidden", 0]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](59, 0, null, null, 5, "app-view-recipe", [], null, [["window", "scroll"]], function (_v, en, $event) { var ad = true; if (("window:scroll" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 64).onWindowScroll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_33__view_recipe_view_recipe_component_ngfactory__["b" /* View_ViewRecipeComponent_0 */], __WEBPACK_IMPORTED_MODULE_33__view_recipe_view_recipe_component_ngfactory__["a" /* RenderType_ViewRecipeComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](4608, null, __WEBPACK_IMPORTED_MODULE_27__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_27__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], [__WEBPACK_IMPORTED_MODULE_34__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__["Ng4LoadingSpinnerService"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_35__services_database_service_service__["a" /* DatabaseServiceService */], __WEBPACK_IMPORTED_MODULE_35__services_database_service_service__["a" /* DatabaseServiceService */], [__WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](64, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_36__view_recipe_view_recipe_component__["a" /* ViewRecipeComponent */], [__WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_37__angular_platform_browser__["b" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_35__services_database_service_service__["a" /* DatabaseServiceService */]], { recipes: [0, "recipes"], user: [1, "user"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, !_co.recipe); _ck(_v, 3, 0, currVal_0); _ck(_v, 5, 0); var currVal_10 = "push"; var currVal_11 = _co.opened; _ck(_v, 10, 0, currVal_10, currVal_11); var currVal_12 = _co.user; _ck(_v, 16, 0, currVal_12); var currVal_15 = _ck(_v, 24, 0, true, !!_co.recipe, !_co.recipe); _ck(_v, 23, 0, currVal_15); var currVal_16 = _co.notifications; _ck(_v, 34, 0, currVal_16); var currVal_17 = !_co.hideBadges; _ck(_v, 38, 0, currVal_17); var currVal_18 = !_co.hideBadges; _ck(_v, 41, 0, currVal_18); var currVal_19 = !_co.hideHeader; _ck(_v, 47, 0, currVal_19); _ck(_v, 53, 0); var currVal_21 = _co.recipe; var currVal_22 = _co.user; _ck(_v, 64, 0, currVal_21, currVal_22); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10)._animationState; var currVal_2 = null; var currVal_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).position === "end"); var currVal_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).mode === "over"); var currVal_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).mode === "push"); var currVal_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).mode === "side"); var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).fixedInViewport; var currVal_8 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).fixedInViewport ? __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).fixedTopGap : null); var currVal_9 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).fixedInViewport ? __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).fixedBottomGap : null); _ck(_v, 9, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20)._margins.left; var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20)._margins.right; _ck(_v, 19, 0, currVal_13, currVal_14); var currVal_20 = !_co.recipe; _ck(_v, 57, 0, currVal_20); }); }
function View_RecipeSearchComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "app-recipe-search", [], null, null, null, View_RecipeSearchComponent_0, RenderType_RecipeSearchComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], [__WEBPACK_IMPORTED_MODULE_34__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_23_ng4_loading_spinner__["Ng4LoadingSpinnerService"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_18__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_19_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_38__recipe_search_component__["a" /* RecipeSearchComponent */], [__WEBPACK_IMPORTED_MODULE_32__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_37__angular_platform_browser__["b" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_20__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_18__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */]], null, null)], function (_ck, _v) { _ck(_v, 4, 0); }, null); }
var RecipeSearchComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-recipe-search", __WEBPACK_IMPORTED_MODULE_38__recipe_search_component__["a" /* RecipeSearchComponent */], View_RecipeSearchComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/recipe-search/recipe-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__("./node_modules/firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);







var RecipeSearchComponent = /** @class */ (function () {
    function RecipeSearchComponent(recipeService, document, appGlobal, translate, activatedRoute, authService) {
        this.recipeService = recipeService;
        this.document = document;
        this.appGlobal = appGlobal;
        this.translate = translate;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.hideHeader = false;
        this.hideBadges = false;
    }
    RecipeSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var language = '';
        this.activatedRoute.params.forEach(function (param) {
            language = param['language'];
        });
        this.translate.setDefaultLang(language || this.appGlobal.defaultContent);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            this.hideBadges = true;
        }
        else {
            this.hideBadges = false;
        }
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().getRedirectResult().then(function (result) {
            _this.authService.getUserNotifications().then(function (notifications) {
                if (!notifications) {
                    _this.notifications = [{ title: "You have 0 Notifications" }];
                }
                _this.notifications = notifications;
            });
        });
    };
    RecipeSearchComponent.prototype.setUserInfo = function (user) {
        this.user = user;
    };
    RecipeSearchComponent.prototype.sendRecipes = function (result) {
        this.recipe = result;
    };
    return RecipeSearchComponent;
}());



/***/ }),

/***/ "./src/app/recipe.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng4_loading_spinner__);


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
    return RecipeService;
}());



/***/ }),

/***/ "./src/app/search/search.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".input-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}\n.chevron[_ngcontent-%COMP%]{\n  padding-top: 2em;\n}\n.glyph[_ngcontent-%COMP%]{\n  background: transparent;\n}\n.danger[_ngcontent-%COMP%]{\n  color:red;\n}\n.ng-invalid[_ngcontent-%COMP%]{\n  border-color: red;\n}\n.mat-form-field[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.mar-right[_ngcontent-%COMP%]{\n  margin-right: 1em;\n}\n.mar-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 0.5em;\n}\n.center-justify[_ngcontent-%COMP%]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-top: 1em;\n}\n.back-green[_ngcontent-%COMP%] {\n  background-color: green;\n}\n.back-yellow[_ngcontent-%COMP%] {\n  background-color: yellow;\n}\n.back-red[_ngcontent-%COMP%] {\n  background-color: red;\n}\nmat-chip[_ngcontent-%COMP%] {\n  margin-bottom: 1em!important;\n  -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);\n          box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);\n  color: white;\n}\nmat-card[_ngcontent-%COMP%] {\n  margin-right: 1em;\n}\n.align-left[_ngcontent-%COMP%]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.voice-start[_ngcontent-%COMP%]{\n  color: red;\n}\n.fa-13x[_ngcontent-%COMP%] {\n  font-size: 1.3em;\n       }"];



/***/ }),

/***/ "./src/app/search/search.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_SearchComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_SearchComponent_0;
/* unused harmony export View_SearchComponent_Host_0 */
/* unused harmony export SearchComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search_component_css_shim_ngstyle__ = __webpack_require__("./src/app/search/search.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap_tooltip_tooltip__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_chips__ = __webpack_require__("./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_angular_material_chips_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/chips/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_cdk_bidi__ = __webpack_require__("./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__google_cloud_vision_service__ = __webpack_require__("./src/app/google-cloud-vision.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__search_component__ = __webpack_require__("./src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_ng4_loading_spinner__);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

























var styles_SearchComponent = [__WEBPACK_IMPORTED_MODULE_0__search_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_SearchComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_SearchComponent, data: {} });

function View_SearchComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "p", [["class", "text-center danger"]], [[8, "innerHTML", 1]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 0, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).transform("IngredientSearchErrorMessage")); _ck(_v, 0, 0, currVal_0); }); }
function View_SearchComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 16777216, null, null, 3, "a", [["class", "mar-right"], ["matSuffix", ""], ["ngbTooltip", "clear all"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clearSearchBoxes() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 16384, [[8, 4]], 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["d" /* MatSuffix */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap_tooltip_tooltip__["a" /* NgbTooltip */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]], { ngbTooltip: [0, "ngbTooltip"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](3, 0, null, null, 0, "mat-icon", [["class", "fa fa-times"], ["color", "warn"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](0, null, null, 0))], function (_ck, _v) { var currVal_0 = "clear all"; _ck(_v, 2, 0, currVal_0); }, null); }
function View_SearchComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "a", [["matSuffix", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.enableSpeech() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](2, { "voice-start": 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, [[8, 4]], 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["d" /* MatSuffix */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 0, "mat-icon", [["class", "fas fa-microphone"]], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, _co.voiceStarted); _ck(_v, 1, 0, currVal_0); }, null); }
function View_SearchComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "a", [["matSuffix", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeSearchBox(_v.parent.context.index) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 16384, [[8, 4]], 0, __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["d" /* MatSuffix */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "mat-icon", [["class", "fa fa-times"], ["color", "warn"]], null, null, null, null, null))], null, null); }
function View_SearchComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 42, "div", [["class", "row"], ["formArrayName", "search"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["e" /* FormArrayName */], [[3, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["e" /* FormArrayName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, null, 0, "div", [["class", "col-md-2"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 34, "div", [["class", "col-md-8 input-group"]], [[8, "hidden", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["i" /* FormGroupName */], [[3, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["i" /* FormGroupName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 28, "mat-input-container", [["class", "md-icon-float mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](13, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_10__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 4, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 5, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 6, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 8, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, 1, 8, "input", [["class", "width mat-input-element mat-form-field-autofill-control"], ["formControlName", "name"], ["matInput", ""], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](25, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](27, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](28, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_11__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_10__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { id: [0, "id"], placeholder: [1, "placeholder"], type: [2, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[2, 4]], __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_11__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 4, 1, null, View_SearchComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](33, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 4, 1, null, View_SearchComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](36, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 4, 1, null, View_SearchComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](39, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = "search"; _ck(_v, 1, 0, currVal_7); var currVal_16 = _v.context.index; _ck(_v, 8, 0, currVal_16); var currVal_47 = "name"; _ck(_v, 25, 0, currVal_47); var currVal_48 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "search-", _v.context.index, ""); var currVal_49 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 28, 1, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 29).transform("IngredientLabel")), ""); var currVal_50 = "text"; _ck(_v, 28, 0, currVal_48, currVal_49, currVal_50); var currVal_51 = (_co.myForm.touched && (_v.context.index === 0)); _ck(_v, 33, 0, currVal_51); var currVal_52 = (_v.context.index === 0); _ck(_v, 36, 0, currVal_52); var currVal_53 = (_v.context.index > 0); _ck(_v, 39, 0, currVal_53); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ngClassPending; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = ((_v.context.index > 1) && !_co.collapsed); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassUntouched; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassTouched; var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPristine; var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassDirty; var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassValid; var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassInvalid; var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPending; _ck(_v, 7, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15); var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._control.errorState; var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._control.errorState; var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._canLabelFloat; var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldLabelFloat(); var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._hideControlPlaceholder(); var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._control.disabled; var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._control.focused; var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("untouched"); var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("touched"); var currVal_26 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("pristine"); var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("dirty"); var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("valid"); var currVal_29 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("invalid"); var currVal_30 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 13)._shouldForward("pending"); _ck(_v, 12, 1, [currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30]); var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassUntouched; var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassTouched; var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassPristine; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassDirty; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassValid; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassInvalid; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).ngClassPending; var currVal_38 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._isServer; var currVal_39 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).id; var currVal_40 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).placeholder; var currVal_41 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).disabled; var currVal_42 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).required; var currVal_43 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).readonly; var currVal_44 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28)._ariaDescribedby || null); var currVal_45 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).errorState; var currVal_46 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).required.toString(); _ck(_v, 22, 1, [currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46]); }); }
function View_SearchComponent_7(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "button", [["class", "glyph btn btn-default"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleCollapse(_co.collapsed) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 0, "i", [["class", "fas fa-angle-down fa-2x"]], null, null, null, null, null))], null, null); }
function View_SearchComponent_8(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "button", [["class", "glyph btn btn-default"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleCollapse(_co.collapsed) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 0, "i", [["class", "fas fa-angle-up fa-2x"]], null, null, null, null, null))], null, null); }
function View_SearchComponent_6(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 12, "div", [["class", "row text-center chevron"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "div", [["class", "col-md-3"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 7, "div", [["class", "col-md-6"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_7)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_8)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.collapsed; _ck(_v, 7, 0, currVal_0); var currVal_1 = _co.collapsed; _ck(_v, 10, 0, currVal_1); }, null); }
function View_SearchComponent_11(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "mat-icon", [["class", "mat-chip-remove"], ["matChipRemove", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1)._handleClick() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_chips__["d" /* MatChipRemove */], [__WEBPACK_IMPORTED_MODULE_13__angular_material_chips__["a" /* MatChip */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 0, "i", [["class", "fas fa-plus-circle"]], null, null, null, null, null))], null, null); }
function View_SearchComponent_10(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 7, "mat-chip", [["class", "mat-chip"], ["role", "option"]], [[1, "tabindex", 0], [2, "mat-chip-selected", null], [1, "disabled", 0], [1, "aria-disabled", 0], [1, "aria-selected", 0]], [[null, "remove"], [null, "click"], [null, "keydown"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3)._handleClick($event) !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3)._handleKeydown($event) !== false);
        ad = (pd_1 && ad);
    } if (("focus" === en)) {
        var pd_2 = ((__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3)._hasFocus = true) !== false);
        ad = (pd_2 && ad);
    } if (("blur" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3)._blur() !== false);
        ad = (pd_3 && ad);
    } if (("remove" === en)) {
        var pd_4 = (_co.addIngredient(_v.context.$implicit.description) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](2, { "back-green": 0, "back-yellow": 1, "back-red": 2 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 147456, [[9, 4]], 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_chips__["a" /* MatChip */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], { selectable: [0, "selectable"], removable: [1, "removable"] }, { onRemove: "remove" }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](4, null, ["\n      ", "\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_11)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](6, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "]))], function (_ck, _v) { var _co = _v.component; var currVal_5 = _ck(_v, 2, 0, (_v.context.$implicit.score > 0.9), ((_v.context.$implicit.score > 0.75) && (_v.context.$implicit.score < 0.9)), (_v.context.$implicit.score < 0.75)); _ck(_v, 1, 0, currVal_5); var currVal_6 = _co.selectable; var currVal_7 = _co.removable; _ck(_v, 3, 0, currVal_6, currVal_7); var currVal_9 = _co.removable; _ck(_v, 6, 0, currVal_9); }, function (_ck, _v) { var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).disabled ? null : (0 - 1)); var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).selected; var currVal_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).disabled || null); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).disabled.toString(); var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).ariaSelected; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4); var currVal_8 = _v.context.$implicit.description; _ck(_v, 4, 0, currVal_8); }); }
function View_SearchComponent_9(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 11, "div", [["class", "col-xs-12 col-md-10  center-justify"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 8, "mat-chip-list", [["class", "mat-chip-list"]], [[1, "tabindex", 0], [1, "aria-describedby", 0], [1, "aria-required", 0], [1, "aria-disabled", 0], [1, "aria-invalid", 0], [1, "aria-multiselectable", 0], [1, "role", 0], [2, "mat-chip-list-disabled", null], [2, "mat-chip-list-invalid", null], [2, "mat-chip-list-required", null], [1, "aria-orientation", 0]], [[null, "focus"], [null, "blur"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("focus" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).focus() !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4)._blur() !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4)._keydown($event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_14__node_modules_angular_material_chips_typings_index_ngfactory__["b" /* View_MatChipList_0 */], __WEBPACK_IMPORTED_MODULE_14__node_modules_angular_material_chips_typings_index_ngfactory__["a" /* RenderType_MatChipList */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](6144, null, __WEBPACK_IMPORTED_MODULE_4__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_13__angular_material_chips__["c" /* MatChipList */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 1556480, [["chipList", 4]], 1, __WEBPACK_IMPORTED_MODULE_13__angular_material_chips__["c" /* MatChipList */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_15__angular_cdk_bidi__["c" /* Directionality */]], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_10__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 9, { chips: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 0, 2, null, View_SearchComponent_10)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["s" /* SlicePipe */], []), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var _co = _v.component; _ck(_v, 4, 0); var currVal_11 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 8, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 9).transform(_co.imageSearchData, 0, 10)); _ck(_v, 8, 0, currVal_11); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4)._tabIndex; var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4)._ariaDescribedby || null); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).required.toString(); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).disabled.toString(); var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).errorState; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).multiple; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).role; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).disabled; var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).errorState; var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).required; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 4).ariaOrientation; _ck(_v, 2, 1, [currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10]); }); }
function View_SearchComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 1, { ie: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, [["formSearch", 1]], null, 37, "div", [["id", "form-search"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](6, 0, null, null, 31, "form", [["class", "container-fluid text-center"], ["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 8).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 8).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["h" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](10, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](13, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](15, 0, null, null, 18, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 0, "div", [["class", "col-md-3  "]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, null, 13, "div", [["class", "col-md-6 text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 2, "button", [["class", "btn btn-primary mar-bottom"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addSearchBox() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](22, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_18__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](25, 0, null, null, 2, "button", [["class", "btn btn-primary mar-bottom"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.search() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](26, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_18__angular_cdk_a11y__["j" /* FocusMonitor */]], { disabled: [0, "disabled"], color: [1, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](29, 0, null, null, 2, "button", [["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.searchPhoto() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_16__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](30, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_17__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_12__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_18__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["search a photo"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_6)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](36, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](40, 0, null, null, 6, "div", [["class", "row text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](42, 0, null, null, 0, "div", [["class", "col-md-1"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_SearchComponent_9)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](45, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_7__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.myForm.valid; _ck(_v, 4, 0, currVal_0); var currVal_8 = _co.myForm; _ck(_v, 8, 0, currVal_8); var currVal_9 = _co.myForm.get("search")["controls"]; _ck(_v, 13, 0, currVal_9); var currVal_12 = (_co.inputs.length >= 10); var currVal_13 = "primary"; _ck(_v, 22, 0, currVal_12, currVal_13); var currVal_16 = !_co.myForm.valid; var currVal_17 = "primary"; _ck(_v, 26, 0, currVal_16, currVal_17); var currVal_19 = "primary"; _ck(_v, 30, 0, currVal_19); var currVal_20 = (_co.myForm.get("search")["controls"].length > 2); _ck(_v, 36, 0, currVal_20); var currVal_21 = (_co.imageSearchData.length > 0); _ck(_v, 45, 0, currVal_21); }, function (_ck, _v) { var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassUntouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassTouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPristine; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassDirty; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassValid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassInvalid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 10).ngClassPending; _ck(_v, 6, 0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7); var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 21, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 23).transform("AddIngredientLabel")); var currVal_11 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 22).disabled || null); _ck(_v, 21, 0, currVal_10, currVal_11); var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 25, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 27).transform("SearchLabel")); var currVal_15 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26).disabled || null); _ck(_v, 25, 0, currVal_14, currVal_15); var currVal_18 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 30).disabled || null); _ck(_v, 29, 0, currVal_18); }); }
function View_SearchComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "app-search", [], null, null, null, View_SearchComponent_0, RenderType_SearchComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](4608, null, __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_6__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_19__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_19__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_20__google_cloud_vision_service__["a" /* GoogleCloudVisionService */], __WEBPACK_IMPORTED_MODULE_20__google_cloud_vision_service__["a" /* GoogleCloudVisionService */], [__WEBPACK_IMPORTED_MODULE_21__angular_http__["d" /* Http */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_22__search_component__["a" /* SearchComponent */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_23__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_24_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_19__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_20__google_cloud_vision_service__["a" /* GoogleCloudVisionService */]], null, null)], function (_ck, _v) { _ck(_v, 4, 0); }, null); }
var SearchComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-search", __WEBPACK_IMPORTED_MODULE_22__search_component__["a" /* SearchComponent */], View_SearchComponent_Host_0, {}, { sendRecipes: "sendRecipes" }, []);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__google_cloud_vision_service__ = __webpack_require__("./src/app/google-cloud-vision.service.ts");









var SearchComponent = /** @class */ (function () {
    function SearchComponent(fb, recipeService, spinnerService, appGlobal, translate, vision) {
        this.fb = fb;
        this.recipeService = recipeService;
        this.spinnerService = spinnerService;
        this.appGlobal = appGlobal;
        this.translate = translate;
        this.vision = vision;
        this.sendRecipes = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.imageSearchData = [];
        this.recipes = new __WEBPACK_IMPORTED_MODULE_3__Models_recipeModel__["a" /* RecipeModel */]({
            RecipeObject: []
        });
        this.selectable = true;
        this.voiceStarted = false;
        this.removable = true;
        this.inputs = ['0'];
        this.collapsed = true;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            'search': this.fb.array([this.createItem()])
        });
        this.translate.setDefaultLang(this.appGlobal.defaultContent);
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
    SearchComponent.prototype.searchPhoto = function () {
        var _this = this;
        navigator['camera'].getPicture(function (data) {
            _this.vision.getLabels(data).subscribe(function (resp) {
                _this.imageSearchData = resp.responses[0].labelAnnotations;
                _this.spinnerService.hide();
            });
        }, function () { }, {
            // @ts-ignore
            destinationType: Camera.DestinationType.DATA_URL,
        });
        // this.spinnerService.show();
        // const fileCount: number = this.ie.nativeElement.files.length;
        // const formData = new FormData();
        // if (fileCount > 0) {
        //   const base64 = new FileReader();
        //   let res;
        //   base64.readAsBinaryString(this.ie.nativeElement.files[0]);
        //   setTimeout(() => {
        //     const str = base64.result;
        //     res = btoa(str);
        //     this.vision.getLabels(res).subscribe(resp => {
        //       this.imageSearchData =  resp.responses[0].labelAnnotations;
        //       this.spinnerService.hide();
        //     });
        //   }, 5000);
        // }
    };
    SearchComponent.prototype.addIngredient = function (description) {
        this.itemsGroup = this.myForm.get('search');
        var descript = this.itemsGroup.value[0].name;
        descript += description + ',';
        this.itemsGroup.controls[0].setValue({ 'name': descript });
    };
    SearchComponent.prototype.createItem = function () {
        return this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["s" /* Validators */].compose([Object(__WEBPACK_IMPORTED_MODULE_5__directives_validators_ingredient_check_directive__["a" /* IngredientCheckDirective */])(/[^a-zA-Z, ]/g)])]
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
            _this.imageSearchData = [];
            var recipes = _this.recipes.getRecipes(result['hits']);
            _this.sendRecipes.emit(new __WEBPACK_IMPORTED_MODULE_3__Models_recipeModel__["a" /* RecipeModel */]({
                RecipeObject: recipes,
                count: count,
                originalList: result
            }));
        });
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
    SearchComponent.prototype.clearSearchBoxes = function () {
        this.itemsGroup = this.myForm.get('search');
        for (var i = this.itemsGroup.length; i > 0; i--) {
            this.itemsGroup.removeAt(i);
        }
        this.itemsGroup.controls[0].setValue({ 'name': '' });
    };
    SearchComponent.prototype.enableSpeech = function () {
        var _this = this;
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();
        var utterThis = new SpeechSynthesisUtterance('please say the ingredient');
        utterThis.voice = voices[10];
        synth.speak(utterThis);
        utterThis.onend = function (evt) {
            var recognition = new (window['SpeechRecognition'] || window['webkitSpeechRecognition'] || window['mozSpeechRecognition'] || window['msSpeechRecognition'])();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 5;
            recognition.start();
            _this.voiceStarted = true;
            recognition.onresult = function (event) {
                var _this = this;
                var transcript = event.results[0][0].transcript;
                if (transcript) {
                    transcript.split(' ').forEach(function (elem) {
                        _this.imageSearchData.push({ description: elem, score: 100 });
                        _this.voiceStarted = false;
                    });
                }
                else {
                    this.voiceStarted = false;
                }
            }.bind(_this);
        };
    };
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__("./node_modules/firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");




var AuthService = /** @class */ (function () {
    function AuthService(_firebaseAuth, router, db) {
        this._firebaseAuth = _firebaseAuth;
        this.router = router;
        this.db = db;
        this.user = _firebaseAuth.authState;
    }
    AuthService.prototype.loginWithEmail = function (email, password) {
        return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.registerWithEmail = function (email, password) {
        return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signOut = function () {
        return this._firebaseAuth.auth.signOut();
    };
    AuthService.prototype.signInWithGoogle = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider();
        return this._firebaseAuth.auth.signInWithRedirect(provider).then(function () {
            return __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().getRedirectResult();
        });
    };
    AuthService.prototype.updateUserDetails = function (formData) {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd);
        return ref.update(formData);
    };
    AuthService.prototype.signInWithFacebook = function () {
        var provider = new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].FacebookAuthProvider();
        return this._firebaseAuth.auth.signInWithRedirect(provider).then(function () {
            return __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"]().getRedirectResult();
        });
    };
    AuthService.prototype.getUserNotifications = function () {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd + '/notifications');
        return new Promise(function (res) {
            ref.once("value", function (snapshot) {
                var notificationData = snapshot.val();
                if (notificationData) {
                    res(notificationData);
                }
                res(false);
            });
        });
    };
    AuthService.prototype.checkAndReturnUser = function (userEmail) {
        var email = userEmail || this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd);
        return new Promise(function (res) {
            ref.once("value", function (snapshot) {
                var userData = snapshot.val();
                if (userData) {
                    res(userData);
                }
                res(false);
            });
        });
    };
    AuthService.prototype.checkiIfObjectIsThere = function (email) {
        var _this = this;
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users');
        return new Promise(function (res) {
            var email = _this._firebaseAuth.auth.currentUser.email;
            var emailAd = email.split('@')[0];
            ref.once("value", function (snapshot) {
                var userData = snapshot.val();
                if (Object.keys(userData).indexOf(emailAd) > -1) {
                    res(userData);
                }
                res(false);
            });
        });
    };
    AuthService.prototype.getFollowersDetails = function () {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd + '/followers');
        return new Promise(function (res) {
            ref.once("value", function (snapshot) {
                var followersData = snapshot.val();
                if (followersData) {
                    res(followersData);
                }
                res(false);
            });
        });
    };
    AuthService.prototype.addFollower = function (foundUser) {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd + '/followers');
        return new Promise(function (res) {
            ref.push(foundUser).then(function (snapshot) {
                res(snapshot);
            });
        });
    };
    AuthService.prototype.getMyRecipeDetails = function () {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd + '/myRecipes');
        return new Promise(function (res) {
            ref.once("value", function (snapshot) {
                var recipesData = snapshot.val();
                if (recipesData) {
                    res(recipesData);
                }
                res(false);
            });
        });
    };
    AuthService.prototype.saveMyRecipe = function (rawValue) {
        var email = this._firebaseAuth.auth.currentUser.email;
        var emailAd = email.split('@')[0];
        var ref = __WEBPACK_IMPORTED_MODULE_2_firebase_app__["database"]().ref('/users/' + emailAd + '/myRecipes');
        return new Promise(function (res) {
            ref.push(rawValue).then(function (snapshot) {
                res(snapshot);
            });
        });
    };
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/database-service.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseServiceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app__ = __webpack_require__("./node_modules/firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");


var DatabaseServiceService = /** @class */ (function () {
    function DatabaseServiceService(db) {
        this.db = db;
    }
    DatabaseServiceService.prototype.getFavoriteRecipes = function (userEmail) {
        var ref = __WEBPACK_IMPORTED_MODULE_0_firebase_app__["database"]().ref('/users/' + userEmail.split('@')[0] + '/favoriteRecipe');
        var childPromises = [];
        return new Promise(function (resolve) {
            ref.on('value', function (val) {
                resolve(val.val());
            });
        });
    };
    DatabaseServiceService.prototype.addToFav = function (obj, email) {
        var _this = this;
        var updateObj;
        return this.getRecipe(obj.title).then(function (res) {
            if (res) {
                res['likes'] ? (res['likes'] += 1) : (res['likes'] = 1);
                updateObj = res;
            }
            else {
                obj['likes'] = 1;
                updateObj = obj;
            }
        }).then(function () {
            return _this.db.database.ref('favoriteRecipes/' + obj.title).update(updateObj).then(function (res) {
                _this.db.database.ref('users/' + (email).split('@')[0] + '/favoriteRecipe').push([{ name: obj.title }]);
            }).catch(function (err) {
                console.log(err);
            });
        });
    };
    DatabaseServiceService.prototype.getRecipe = function (recipe) {
        var ref = __WEBPACK_IMPORTED_MODULE_0_firebase_app__["database"]().ref('/favoriteRecipes/' + recipe);
        var childPromises = [];
        return new Promise(function (resolve) {
            ref.on('value', function (val) {
                resolve(val.val());
            });
        });
    };
    return DatabaseServiceService;
}());



/***/ }),

/***/ "./src/app/settings/settings.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".example-headers-align[_ngcontent-%COMP%]   .mat-expansion-panel-header-title[_ngcontent-%COMP%], .example-headers-align[_ngcontent-%COMP%]   .mat-expansion-panel-header-description[_ngcontent-%COMP%] {\n  -ms-flex-preferred-size: 0;\n      flex-basis: 0;\n}\n\n.example-headers-align[_ngcontent-%COMP%]   .mat-expansion-panel-header-description[_ngcontent-%COMP%] {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n@media (max-width: 500px) {\n  .hide-devices[_ngcontent-%COMP%]{\n    display: none;\n  }\n}"];



/***/ }),

/***/ "./src/app/settings/settings.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RenderType_SettingsComponent */
/* unused harmony export View_SettingsComponent_0 */
/* unused harmony export View_SettingsComponent_Host_0 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponentNgFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_component_css_shim_ngstyle__ = __webpack_require__("./src/app/settings/settings.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__ = __webpack_require__("./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/expansion/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_collections__ = __webpack_require__("./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/form-field/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__ = __webpack_require__("./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_core__ = __webpack_require__("./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_input__ = __webpack_require__("./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__snack_bar_snack_bar_component_ngfactory__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__settings_component__ = __webpack_require__("./src/app/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 























var styles_SettingsComponent = [__WEBPACK_IMPORTED_MODULE_0__settings_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_SettingsComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_SettingsComponent, data: {} });

function View_SettingsComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 1, { snackBarRef: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](1, 0, null, null, 197, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 3).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 540672, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */], [[8, null], [8, null]], { form: [0, "form"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 190, "mat-accordion", [["class", "example-headers-align mat-accordion"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](8, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["a" /* MatAccordion */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 16777216, null, null, 72, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(0) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](11, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, 0, 18, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](15, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](16, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](17, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        Personal data\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](23, 0, null, 1, 8, "mat-panel-description", [["class", "mat-expansion-panel-header-description"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](24, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["e" /* MatExpansionPanelDescription */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](26, 0, null, null, 1, "p", [["class", "hide-devices"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Type your name and age"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](29, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 0, "i", [["class", "fas fa-user"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](34, 0, null, 1, 18, "mat-form-field", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](35, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 4, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 5, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 6, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 7, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 8, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 9, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](44, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "name"], ["matInput", ""], ["placeholder", "First name"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](45, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](47, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](49, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](50, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[3, 4]], __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](54, 0, null, 1, 19, "mat-form-field", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](55, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 10, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 11, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 12, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 13, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 14, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 15, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 16, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](64, 0, null, 1, 8, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "age"], ["matInput", ""], ["min", "1"], ["placeholder", "Age"], ["type", "number"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "change"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 65)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 65).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 65)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 65)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("change" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 66).onChange($event.target.value) !== false);
        ad = (pd_4 && ad);
    } if (("input" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 66).onChange($event.target.value) !== false);
        ad = (pd_5 && ad);
    } if (("blur" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 66).onTouched() !== false);
        ad = (pd_6 && ad);
    } if (("blur" === en)) {
        var pd_7 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._focusChanged(false) !== false);
        ad = (pd_7 && ad);
    } if (("focus" === en)) {
        var pd_8 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._focusChanged(true) !== false);
        ad = (pd_8 && ad);
    } if (("input" === en)) {
        var pd_9 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._onInput() !== false);
        ad = (pd_9 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](65, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](66, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["u" /* ɵbc */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0, p1_0) { return [p0_0, p1_0]; }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["u" /* ɵbc */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](68, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](70, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](71, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"], type: [1, "type"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[10, 4]], __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](75, 0, null, 2, 6, "mat-action-row", [["class", "mat-action-row"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](76, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["d" /* MatExpansionPanelActionRow */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](78, 0, null, null, 2, "button", [["color", "primary"], ["mat-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.nextStep() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](79, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Next"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](84, 16777216, null, null, 55, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(1) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](85, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 17, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](88, 0, null, 0, 18, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](89, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](90, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](91, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](93, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](94, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        Country\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](97, 0, null, 1, 8, "mat-panel-description", [["class", "mat-expansion-panel-header-description"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](98, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["e" /* MatExpansionPanelDescription */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](100, 0, null, null, 1, "p", [["class", "hide-devices"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Type the country name"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](103, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](104, 0, null, null, 0, "i", [["class", "fas fa-map-marker-alt"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](108, 0, null, 1, 18, "mat-form-field", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](109, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 18, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 19, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 20, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 21, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 22, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 23, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 24, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](118, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "country"], ["matInput", ""], ["placeholder", "Country"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 119)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 119).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 119)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 119)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](119, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](121, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](123, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](124, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[18, 4]], __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](128, 0, null, 2, 10, "mat-action-row", [["class", "mat-action-row"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](129, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["d" /* MatExpansionPanelActionRow */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](131, 0, null, null, 2, "button", [["color", "warn"], ["mat-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.prevStep() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](132, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Previous"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](135, 0, null, null, 2, "button", [["color", "primary"], ["mat-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.nextStep() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](136, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Next"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](141, 16777216, null, null, 55, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(2) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](142, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 25, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](145, 0, null, 0, 18, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](146, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](147, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](148, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](150, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](151, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        Language Settings\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](154, 0, null, 1, 8, "mat-panel-description", [["class", "mat-expansion-panel-header-description"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](155, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["e" /* MatExpansionPanelDescription */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](157, 0, null, null, 1, "p", [["class", "hide-devices"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["Enter your default language"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](160, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](161, 0, null, null, 0, "i", [["class", "fas fa-language"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](165, 0, null, 1, 18, "mat-form-field", [["class", "mat-input-container mat-form-field"]], [[2, "mat-input-invalid", null], [2, "mat-form-field-invalid", null], [2, "mat-form-field-can-float", null], [2, "mat-form-field-should-float", null], [2, "mat-form-field-hide-placeholder", null], [2, "mat-form-field-disabled", null], [2, "mat-focused", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["b" /* View_MatFormField_0 */], __WEBPACK_IMPORTED_MODULE_7__node_modules_angular_material_form_field_typings_index_ngfactory__["a" /* RenderType_MatFormField */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](166, 7389184, null, 7, __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["a" /* MatFormField */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], [2, __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["i" /* MAT_LABEL_GLOBAL_OPTIONS */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 26, { _control: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 27, { _placeholderChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 28, { _labelChild: 0 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 29, { _errorChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 30, { _hintChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 31, { _prefixChildren: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](603979776, 32, { _suffixChildren: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](175, 0, null, 1, 7, "input", [["class", "mat-input-element mat-form-field-autofill-control"], ["formControlName", "language"], ["matInput", ""], ["placeholder", "Language"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null], [2, "mat-input-server", null], [1, "id", 0], [8, "placeholder", 0], [8, "disabled", 0], [8, "required", 0], [8, "readOnly", 0], [1, "aria-describedby", 0], [1, "aria-invalid", 0], [1, "aria-required", 0]], [[null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"], [null, "focus"]], function (_v, en, $event) { var ad = true; if (("input" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 176)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 176).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 176)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 176)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("blur" === en)) {
        var pd_4 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181)._focusChanged(false) !== false);
        ad = (pd_4 && ad);
    } if (("focus" === en)) {
        var pd_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181)._focusChanged(true) !== false);
        ad = (pd_5 && ad);
    } if (("input" === en)) {
        var pd_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181)._onInput() !== false);
        ad = (pd_6 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](176, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* COMPOSITION_BUFFER_MODE */]]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](1024, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* DefaultValueAccessor */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](178, 671744, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */], [[3, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* ControlContainer */]], [8, null], [8, null], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* NG_VALUE_ACCESSOR */]]], { name: [0, "name"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */], null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* FormControlName */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](180, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["n" /* NgControlStatus */], [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](181, 933888, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["m" /* NgControl */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["p" /* NgForm */]], [2, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* FormGroupDirective */]], __WEBPACK_IMPORTED_MODULE_9__angular_material_core__["d" /* ErrorStateMatcher */], [8, null]], { placeholder: [0, "placeholder"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, [[26, 4]], __WEBPACK_IMPORTED_MODULE_8__angular_material_form_field__["b" /* MatFormFieldControl */], null, [__WEBPACK_IMPORTED_MODULE_10__angular_material_input__["b" /* MatInput */]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](185, 0, null, 2, 10, "mat-action-row", [["class", "mat-action-row"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](186, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["d" /* MatExpansionPanelActionRow */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](188, 0, null, null, 2, "button", [["color", "warn"], ["mat-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.prevStep() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](189, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Previous"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](192, 0, null, null, 2, "button", [["color", "primary"], ["mat-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.saveDetails() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_12__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](193, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_13__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Save"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](200, 0, null, null, 1, "app-snack-bar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_14__snack_bar_snack_bar_component_ngfactory__["b" /* View_SnackBarComponent_0 */], __WEBPACK_IMPORTED_MODULE_14__snack_bar_snack_bar_component_ngfactory__["a" /* RenderType_SnackBarComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](201, 114688, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_15__snack_bar_snack_bar_component__["a" /* SnackBarComponent */], [__WEBPACK_IMPORTED_MODULE_16__angular_material_snack_bar__["b" /* MatSnackBar */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.settingsForm; _ck(_v, 3, 0, currVal_7); var currVal_10 = (_co.step === 0); var currVal_11 = "true"; _ck(_v, 11, 0, currVal_10, currVal_11); var currVal_49 = "name"; _ck(_v, 47, 0, currVal_49); var currVal_50 = "First name"; _ck(_v, 50, 0, currVal_50); var currVal_81 = "age"; _ck(_v, 68, 0, currVal_81); var currVal_82 = "Age"; var currVal_83 = "number"; _ck(_v, 71, 0, currVal_82, currVal_83); var currVal_85 = "primary"; _ck(_v, 79, 0, currVal_85); var currVal_88 = (_co.step === 1); var currVal_89 = "true"; _ck(_v, 85, 0, currVal_88, currVal_89); var currVal_127 = "country"; _ck(_v, 121, 0, currVal_127); var currVal_128 = "Country"; _ck(_v, 124, 0, currVal_128); var currVal_130 = "warn"; _ck(_v, 132, 0, currVal_130); var currVal_132 = "primary"; _ck(_v, 136, 0, currVal_132); var currVal_135 = (_co.step === 2); var currVal_136 = "true"; _ck(_v, 142, 0, currVal_135, currVal_136); var currVal_174 = "language"; _ck(_v, 178, 0, currVal_174); var currVal_175 = "Language"; _ck(_v, 181, 0, currVal_175); var currVal_177 = "warn"; _ck(_v, 189, 0, currVal_177); var currVal_179 = "primary"; _ck(_v, 193, 0, currVal_179); _ck(_v, 201, 0); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassUntouched; var currVal_1 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassTouched; var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassPristine; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassDirty; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassValid; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassInvalid; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).ngClassPending; _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11).expanded; var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 11)._hasSpacing(); _ck(_v, 10, 0, currVal_8, currVal_9); var currVal_12 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).panel._headerId; var currVal_13 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).panel.disabled ? (0 - 1) : 0); var currVal_14 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._getPanelId(); var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._isExpanded(); var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).panel.disabled; var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._isExpanded(); var currVal_18 = _ck(_v, 17, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15)._getExpandedState(), _ck(_v, 16, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 15).expandedHeight)); _ck(_v, 14, 0, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18); var currVal_19 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._control.errorState; var currVal_20 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._control.errorState; var currVal_21 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._canLabelFloat; var currVal_22 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldLabelFloat(); var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._hideControlPlaceholder(); var currVal_24 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._control.disabled; var currVal_25 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._control.focused; var currVal_26 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("untouched"); var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("touched"); var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("pristine"); var currVal_29 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("dirty"); var currVal_30 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("valid"); var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("invalid"); var currVal_32 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 35)._shouldForward("pending"); _ck(_v, 34, 1, [currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25, currVal_26, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32]); var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassUntouched; var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassTouched; var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassPristine; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassDirty; var currVal_37 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassValid; var currVal_38 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassInvalid; var currVal_39 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).ngClassPending; var currVal_40 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50)._isServer; var currVal_41 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).id; var currVal_42 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).placeholder; var currVal_43 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).disabled; var currVal_44 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).required; var currVal_45 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).readonly; var currVal_46 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50)._ariaDescribedby || null); var currVal_47 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).errorState; var currVal_48 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 50).required.toString(); _ck(_v, 44, 1, [currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39, currVal_40, currVal_41, currVal_42, currVal_43, currVal_44, currVal_45, currVal_46, currVal_47, currVal_48]); var currVal_51 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._control.errorState; var currVal_52 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._control.errorState; var currVal_53 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._canLabelFloat; var currVal_54 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldLabelFloat(); var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._hideControlPlaceholder(); var currVal_56 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._control.disabled; var currVal_57 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._control.focused; var currVal_58 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("untouched"); var currVal_59 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("touched"); var currVal_60 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("pristine"); var currVal_61 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("dirty"); var currVal_62 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("valid"); var currVal_63 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("invalid"); var currVal_64 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 55)._shouldForward("pending"); _ck(_v, 54, 1, [currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56, currVal_57, currVal_58, currVal_59, currVal_60, currVal_61, currVal_62, currVal_63, currVal_64]); var currVal_65 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassUntouched; var currVal_66 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassTouched; var currVal_67 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassPristine; var currVal_68 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassDirty; var currVal_69 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassValid; var currVal_70 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassInvalid; var currVal_71 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 70).ngClassPending; var currVal_72 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._isServer; var currVal_73 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).id; var currVal_74 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).placeholder; var currVal_75 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).disabled; var currVal_76 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).required; var currVal_77 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).readonly; var currVal_78 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71)._ariaDescribedby || null); var currVal_79 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).errorState; var currVal_80 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 71).required.toString(); _ck(_v, 64, 1, [currVal_65, currVal_66, currVal_67, currVal_68, currVal_69, currVal_70, currVal_71, currVal_72, currVal_73, currVal_74, currVal_75, currVal_76, currVal_77, currVal_78, currVal_79, currVal_80]); var currVal_84 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 79).disabled || null); _ck(_v, 78, 0, currVal_84); var currVal_86 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 85).expanded; var currVal_87 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 85)._hasSpacing(); _ck(_v, 84, 0, currVal_86, currVal_87); var currVal_90 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).panel._headerId; var currVal_91 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).panel.disabled ? (0 - 1) : 0); var currVal_92 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._getPanelId(); var currVal_93 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._isExpanded(); var currVal_94 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).panel.disabled; var currVal_95 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._isExpanded(); var currVal_96 = _ck(_v, 91, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89)._getExpandedState(), _ck(_v, 90, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 89).expandedHeight)); _ck(_v, 88, 0, currVal_90, currVal_91, currVal_92, currVal_93, currVal_94, currVal_95, currVal_96); var currVal_97 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._control.errorState; var currVal_98 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._control.errorState; var currVal_99 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._canLabelFloat; var currVal_100 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldLabelFloat(); var currVal_101 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._hideControlPlaceholder(); var currVal_102 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._control.disabled; var currVal_103 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._control.focused; var currVal_104 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("untouched"); var currVal_105 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("touched"); var currVal_106 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("pristine"); var currVal_107 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("dirty"); var currVal_108 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("valid"); var currVal_109 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("invalid"); var currVal_110 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 109)._shouldForward("pending"); _ck(_v, 108, 1, [currVal_97, currVal_98, currVal_99, currVal_100, currVal_101, currVal_102, currVal_103, currVal_104, currVal_105, currVal_106, currVal_107, currVal_108, currVal_109, currVal_110]); var currVal_111 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassUntouched; var currVal_112 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassTouched; var currVal_113 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassPristine; var currVal_114 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassDirty; var currVal_115 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassValid; var currVal_116 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassInvalid; var currVal_117 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 123).ngClassPending; var currVal_118 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124)._isServer; var currVal_119 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).id; var currVal_120 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).placeholder; var currVal_121 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).disabled; var currVal_122 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).required; var currVal_123 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).readonly; var currVal_124 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124)._ariaDescribedby || null); var currVal_125 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).errorState; var currVal_126 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 124).required.toString(); _ck(_v, 118, 1, [currVal_111, currVal_112, currVal_113, currVal_114, currVal_115, currVal_116, currVal_117, currVal_118, currVal_119, currVal_120, currVal_121, currVal_122, currVal_123, currVal_124, currVal_125, currVal_126]); var currVal_129 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 132).disabled || null); _ck(_v, 131, 0, currVal_129); var currVal_131 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 136).disabled || null); _ck(_v, 135, 0, currVal_131); var currVal_133 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 142).expanded; var currVal_134 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 142)._hasSpacing(); _ck(_v, 141, 0, currVal_133, currVal_134); var currVal_137 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146).panel._headerId; var currVal_138 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146).panel.disabled ? (0 - 1) : 0); var currVal_139 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._getPanelId(); var currVal_140 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._isExpanded(); var currVal_141 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146).panel.disabled; var currVal_142 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._isExpanded(); var currVal_143 = _ck(_v, 148, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146)._getExpandedState(), _ck(_v, 147, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 146).expandedHeight)); _ck(_v, 145, 0, currVal_137, currVal_138, currVal_139, currVal_140, currVal_141, currVal_142, currVal_143); var currVal_144 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._control.errorState; var currVal_145 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._control.errorState; var currVal_146 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._canLabelFloat; var currVal_147 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldLabelFloat(); var currVal_148 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._hideControlPlaceholder(); var currVal_149 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._control.disabled; var currVal_150 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._control.focused; var currVal_151 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("untouched"); var currVal_152 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("touched"); var currVal_153 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("pristine"); var currVal_154 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("dirty"); var currVal_155 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("valid"); var currVal_156 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("invalid"); var currVal_157 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 166)._shouldForward("pending"); _ck(_v, 165, 1, [currVal_144, currVal_145, currVal_146, currVal_147, currVal_148, currVal_149, currVal_150, currVal_151, currVal_152, currVal_153, currVal_154, currVal_155, currVal_156, currVal_157]); var currVal_158 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassUntouched; var currVal_159 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassTouched; var currVal_160 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassPristine; var currVal_161 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassDirty; var currVal_162 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassValid; var currVal_163 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassInvalid; var currVal_164 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 180).ngClassPending; var currVal_165 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181)._isServer; var currVal_166 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).id; var currVal_167 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).placeholder; var currVal_168 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).disabled; var currVal_169 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).required; var currVal_170 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).readonly; var currVal_171 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181)._ariaDescribedby || null); var currVal_172 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).errorState; var currVal_173 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 181).required.toString(); _ck(_v, 175, 1, [currVal_158, currVal_159, currVal_160, currVal_161, currVal_162, currVal_163, currVal_164, currVal_165, currVal_166, currVal_167, currVal_168, currVal_169, currVal_170, currVal_171, currVal_172, currVal_173]); var currVal_176 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 189).disabled || null); _ck(_v, 188, 0, currVal_176); var currVal_178 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 193).disabled || null); _ck(_v, 192, 0, currVal_178); }); }
function View_SettingsComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "app-settings", [], null, null, null, View_SettingsComponent_0, RenderType_SettingsComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_19__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_20_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_21__settings_component__["a" /* SettingsComponent */], [__WEBPACK_IMPORTED_MODULE_22__angular_material_dialog__["h" /* MatDialogRef */], __WEBPACK_IMPORTED_MODULE_22__angular_material_dialog__["a" /* MAT_DIALOG_DATA */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */]], null, null)], function (_ck, _v) { _ck(_v, 2, 0); }, null); }
var SettingsComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-settings", __WEBPACK_IMPORTED_MODULE_21__settings_component__["a" /* SettingsComponent */], View_SettingsComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Models_UserSettingsModel__ = __webpack_require__("./src/app/Models/UserSettingsModel.ts");






var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dialogRef, data, fb, authService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.authService = authService;
        this.step = 0;
    }
    SettingsComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SettingsComponent.prototype.saveDetails = function () {
        var _this = this;
        var formDetails = this.settingsForm.getRawValue();
        this.authService.updateUserDetails(formDetails).then(function () {
            _this.snackBarRef.openSnackBar('saved');
        });
    };
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsForm = this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].pattern(/[a-zA-Z ]/g), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].required])],
            age: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].maxLength(2)])],
            country: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].pattern(/[a-zA-Z ]/g), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["s" /* Validators */].required])],
            language: ['']
        });
        this.authService.checkAndReturnUser().then(function (res) {
            if (res) {
                var user = new __WEBPACK_IMPORTED_MODULE_5__Models_UserSettingsModel__["a" /* UserSettingsModel */](res);
                _this.settingsForm.patchValue(user);
            }
        });
    };
    SettingsComponent.prototype.setStep = function (index) {
        this.step = index;
    };
    SettingsComponent.prototype.nextStep = function () {
        this.step++;
    };
    SettingsComponent.prototype.prevStep = function () {
        this.step--;
    };
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/side-nav/side-nav.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".list-group-item[_ngcontent-%COMP%] {\n  border: none;\n}\n.margin-all[_ngcontent-%COMP%] {\n  margin: 1em;\n\n}\n.width-nav[_ngcontent-%COMP%]{\n  width: 15em;\n}\n.width-full[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-form-field[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.mar-bottom[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}\n.list-container[_ngcontent-%COMP%]{\n  height: 90vh;\n  padding-top: 2em;\n}\n.list-container[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]{\n  margin-bottom: 1em !important;\n}"];



/***/ }),

/***/ "./src/app/side-nav/side-nav.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_SideNavComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_SideNavComponent_0;
/* unused harmony export View_SideNavComponent_Host_0 */
/* unused harmony export SideNavComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__side_nav_component_css_shim_ngstyle__ = __webpack_require__("./src/app/side-nav/side-nav.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__ = __webpack_require__("./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/expansion/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_cdk_collections__ = __webpack_require__("./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__snack_bar_snack_bar_component_ngfactory__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core_src_translate_store__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core_src_translate_loader__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.loader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core_src_translate_compiler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.compiler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core_src_translate_parser__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.parser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_core_src_missing_translation_handler__ = __webpack_require__("./node_modules/@ngx-translate/core/src/missing-translation-handler.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2_auth__ = __webpack_require__("./node_modules/angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__side_nav_component__ = __webpack_require__("./src/app/side-nav/side-nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ng4_loading_spinner__);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





























var styles_SideNavComponent = [__WEBPACK_IMPORTED_MODULE_0__side_nav_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_SideNavComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_SideNavComponent, data: {} });

function View_SideNavComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "button", [["class", "width-full"], ["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.login() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 0, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).transform("LoginLabel")); var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_SideNavComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 2, "button", [["class", "width-full"], ["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.register() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]])], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 1, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 0, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 2).transform("registerLabel")); var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 1).disabled || null); _ck(_v, 0, 0, currVal_0, currVal_1); }); }
function View_SideNavComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 92, "div", [["class", "margin-all width-nav containr"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 89, "div", [["class", "list-container"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 1, "h6", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](5, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](8, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](10, 0, null, null, 80, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; if (("submit" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 12).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 12).onReset() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["v" /* ɵbf */], [], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](12, 4210688, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["p" /* NgForm */], [[8, null], [8, null]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](2048, null, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */], null, [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["p" /* NgForm */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](14, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["o" /* NgControlStatusGroup */], [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* ControlContainer */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](16, 0, null, null, 73, "mat-accordion", [["class", "example-headers-align mat-accordion"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](17, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["a" /* MatAccordion */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](19, 16777216, null, null, 23, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(0) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](20, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 1, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](23, 0, null, 0, 8, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](24, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](25, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](26, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](28, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](29, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              User\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 1, 1, null, View_SideNavComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, 1, 1, null, View_SideNavComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](37, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_12__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](39, 0, null, 1, 2, "button", [["class", "width-full"], ["color", "warn"], ["mat-raised-button", ""], ["type", "button"]], [[8, "hidden", 0], [8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.signOut() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](40, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](44, 16777216, null, null, 21, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[8, "hidden", 0], [2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(1) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](45, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 2, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](48, 0, null, 0, 8, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](49, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](50, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](51, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](53, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](54, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n              Features\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](58, 0, null, 1, 2, "button", [["class", "width-full"], ["color", "link"], ["mat-raised-button", ""], ["type", "button"]], [[8, "hidden", 0], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleFollowers() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](59, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["Follow"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](62, 0, null, 1, 2, "button", [["class", "width-full"], ["color", "primary"], ["mat-raised-button", ""], ["type", "button"]], [[8, "hidden", 0], [8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.openDialog() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](63, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](67, 16777216, null, null, 21, "mat-expansion-panel", [["class", "mat-expansion-panel"], ["hideToggle", "true"]], [[8, "hidden", 0], [2, "mat-expanded", null], [2, "mat-expansion-panel-spacing", null]], [[null, "opened"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("opened" === en)) {
        var pd_0 = (_co.setStep(2) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["d" /* View_MatExpansionPanel_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["a" /* RenderType_MatExpansionPanel */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](68, 1753088, null, 1, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], [[2, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["a" /* MatAccordion */]], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_11__angular_cdk_collections__["d" /* UniqueSelectionDispatcher */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"]], { expanded: [0, "expanded"], hideToggle: [1, "hideToggle"] }, { opened: "opened" }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](335544320, 3, { _lazyContent: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](71, 0, null, 0, 8, "mat-expansion-panel-header", [["class", "mat-expansion-panel-header"], ["role", "button"]], [[1, "id", 0], [1, "tabindex", 0], [1, "aria-controls", 0], [1, "aria-expanded", 0], [1, "aria-disabled", 0], [2, "mat-expanded", null], [40, "@expansionHeight", 0]], [[null, "click"], [null, "keydown"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._toggle() !== false);
        ad = (pd_0 && ad);
    } if (("keydown" === en)) {
        var pd_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._keydown($event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["c" /* View_MatExpansionPanelHeader_0 */], __WEBPACK_IMPORTED_MODULE_10__node_modules_angular_material_expansion_typings_index_ngfactory__["b" /* RenderType_MatExpansionPanelHeader */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](72, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["f" /* MatExpansionPanelHeader */], [__WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["c" /* MatExpansionPanel */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]], null, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](73, { collapsedHeight: 0, expandedHeight: 1 }), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](74, { value: 0, params: 1 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](76, 0, null, 0, 2, "mat-panel-title", [["class", "mat-expansion-panel-header-title"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](77, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_9__angular_material_expansion__["g" /* MatExpansionPanelTitle */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            Recipes\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 2, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](81, 0, null, 1, 2, "button", [["class", "width-full"], ["color", "link"], ["mat-raised-button", ""], ["type", "button"]], [[8, "hidden", 0], [8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleFavRecipes() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](82, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](85, 0, null, 1, 2, "button", [["class", "width-full"], ["color", "link"], ["mat-raised-button", ""], ["type", "button"]], [[8, "hidden", 0], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleMyRecipies() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](86, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["My Recipes"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 1, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](94, 0, null, null, 1, "app-snack-bar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_13__snack_bar_snack_bar_component_ngfactory__["b" /* View_SnackBarComponent_0 */], __WEBPACK_IMPORTED_MODULE_13__snack_bar_snack_bar_component_ngfactory__["a" /* RenderType_SnackBarComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](95, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_14__snack_bar_snack_bar_component__["a" /* SnackBarComponent */], [__WEBPACK_IMPORTED_MODULE_15__angular_material_snack_bar__["b" /* MatSnackBar */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_11 = (_co.step === 0); var currVal_12 = "true"; _ck(_v, 20, 0, currVal_11, currVal_12); var currVal_20 = !_co.loginActive; _ck(_v, 34, 0, currVal_20); var currVal_21 = !_co.loginActive; _ck(_v, 37, 0, currVal_21); var currVal_25 = "warn"; _ck(_v, 40, 0, currVal_25); var currVal_29 = (_co.step === 1); var currVal_30 = "true"; _ck(_v, 45, 0, currVal_29, currVal_30); var currVal_40 = "link"; _ck(_v, 59, 0, currVal_40); var currVal_44 = "primary"; _ck(_v, 63, 0, currVal_44); var currVal_48 = (_co.step === 2); var currVal_49 = "true"; _ck(_v, 68, 0, currVal_48, currVal_49); var currVal_60 = "link"; _ck(_v, 82, 0, currVal_60); var currVal_63 = "link"; _ck(_v, 86, 0, currVal_63); _ck(_v, 95, 0); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.displayName; _ck(_v, 5, 0, currVal_0); var currVal_1 = _co.userEmail; _ck(_v, 8, 0, currVal_1); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassUntouched; var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassTouched; var currVal_4 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassPristine; var currVal_5 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassDirty; var currVal_6 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassValid; var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassInvalid; var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 14).ngClassPending; _ck(_v, 10, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20).expanded; var currVal_10 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 20)._hasSpacing(); _ck(_v, 19, 0, currVal_9, currVal_10); var currVal_13 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).panel._headerId; var currVal_14 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).panel.disabled ? (0 - 1) : 0); var currVal_15 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._getPanelId(); var currVal_16 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._isExpanded(); var currVal_17 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).panel.disabled; var currVal_18 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._isExpanded(); var currVal_19 = _ck(_v, 26, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24)._getExpandedState(), _ck(_v, 25, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).expandedHeight)); _ck(_v, 23, 0, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17, currVal_18, currVal_19); var currVal_22 = !_co.loginActive; var currVal_23 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 39, 1, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 41).transform("signOutLabel")); var currVal_24 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 40).disabled || null); _ck(_v, 39, 0, currVal_22, currVal_23, currVal_24); var currVal_26 = !_co.loginActive; var currVal_27 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45).expanded; var currVal_28 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 45)._hasSpacing(); _ck(_v, 44, 0, currVal_26, currVal_27, currVal_28); var currVal_31 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).panel._headerId; var currVal_32 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).panel.disabled ? (0 - 1) : 0); var currVal_33 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._getPanelId(); var currVal_34 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._isExpanded(); var currVal_35 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).panel.disabled; var currVal_36 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._isExpanded(); var currVal_37 = _ck(_v, 51, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49)._getExpandedState(), _ck(_v, 50, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 49).expandedHeight)); _ck(_v, 48, 0, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37); var currVal_38 = !_co.loginActive; var currVal_39 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 59).disabled || null); _ck(_v, 58, 0, currVal_38, currVal_39); var currVal_41 = !_co.loginActive; var currVal_42 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 62, 1, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 64).transform("settingsLabel")); var currVal_43 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 63).disabled || null); _ck(_v, 62, 0, currVal_41, currVal_42, currVal_43); var currVal_45 = !_co.loginActive; var currVal_46 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 68).expanded; var currVal_47 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 68)._hasSpacing(); _ck(_v, 67, 0, currVal_45, currVal_46, currVal_47); var currVal_50 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72).panel._headerId; var currVal_51 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72).panel.disabled ? (0 - 1) : 0); var currVal_52 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._getPanelId(); var currVal_53 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._isExpanded(); var currVal_54 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72).panel.disabled; var currVal_55 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._isExpanded(); var currVal_56 = _ck(_v, 74, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72)._getExpandedState(), _ck(_v, 73, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72).collapsedHeight, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 72).expandedHeight)); _ck(_v, 71, 0, currVal_50, currVal_51, currVal_52, currVal_53, currVal_54, currVal_55, currVal_56); var currVal_57 = !_co.loginActive; var currVal_58 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 81, 1, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 83).transform("FavoriteRecipeLabel")); var currVal_59 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 82).disabled || null); _ck(_v, 81, 0, currVal_57, currVal_58, currVal_59); var currVal_61 = !_co.loginActive; var currVal_62 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 86).disabled || null); _ck(_v, 85, 0, currVal_61, currVal_62); }); }
function View_SideNavComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 4, "app-side-nav", [], null, null, null, View_SideNavComponent_0, RenderType_SideNavComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], [__WEBPACK_IMPORTED_MODULE_16__ngx_translate_core_src_translate_store__["a" /* TranslateStore */], __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core_src_translate_loader__["b" /* TranslateLoader */], __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core_src_translate_compiler__["a" /* TranslateCompiler */], __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core_src_translate_parser__["b" /* TranslateParser */], __WEBPACK_IMPORTED_MODULE_20__ngx_translate_core_src_missing_translation_handler__["b" /* MissingTranslationHandler */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["b" /* USE_DEFAULT_LANG */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["c" /* USE_STORE */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_21__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_21__services_auth_service__["a" /* AuthService */], [__WEBPACK_IMPORTED_MODULE_22_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_23__angular_router__["k" /* Router */], __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_25__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_25__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](4, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_26__side_nav_component__["a" /* SideNavComponent */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_27__angular_material_dialog__["e" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_21__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_28_ng4_loading_spinner__["Ng4LoadingSpinnerService"], __WEBPACK_IMPORTED_MODULE_25__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_23__angular_router__["a" /* ActivatedRoute */]], null, null)], function (_ck, _v) { _ck(_v, 4, 0); }, null); }
var SideNavComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-side-nav", __WEBPACK_IMPORTED_MODULE_26__side_nav_component__["a" /* SideNavComponent */], View_SideNavComponent_Host_0, { user: "user" }, { userInfo: "userInfo" }, []);



/***/ }),

/***/ "./src/app/side-nav/side-nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideNavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Models_UserModel__ = __webpack_require__("./src/app/Models/UserModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__favorite_recipe_component_favorite_recipe_component_component__ = __webpack_require__("./src/app/favorite-recipe-component/favorite-recipe-component.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__("./node_modules/firebase/app/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__settings_settings_component__ = __webpack_require__("./src/app/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__followers_followers_component__ = __webpack_require__("./src/app/followers/followers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__my_recipes_my_recipes_component__ = __webpack_require__("./src/app/my-recipes/my-recipes.component.ts");














var SideNavComponent = /** @class */ (function () {
    function SideNavComponent(translate, dialog, auth, spinnerService, appGlobal, route) {
        var _this = this;
        this.translate = translate;
        this.dialog = dialog;
        this.auth = auth;
        this.spinnerService = spinnerService;
        this.appGlobal = appGlobal;
        this.route = route;
        this.userInfo = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.step = 0;
        this.route.params.forEach(function (param) {
            _this.language = param['language'];
        });
        this.translate.setDefaultLang(this.language || this.appGlobal.defaultContent);
        console.log(this.translate.getLangs());
    }
    SideNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().getRedirectResult().then(function (result) {
            var user;
            if (result.credential) {
                user = result.user;
            }
            if (user) {
                var resultObj = {
                    login: true,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    name: result.user.displayName,
                    uid: result.user.uid
                };
                var user_1 = new __WEBPACK_IMPORTED_MODULE_4__Models_UserModel__["a" /* UserModel */](resultObj);
                _this.userInfo.emit(resultObj);
                _this.userEmail = resultObj.email;
                _this.displayName = resultObj.displayName;
                _this.loginActive = true;
            }
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };
    SideNavComponent.prototype.setStep = function (index) {
        this.step = index;
    };
    SideNavComponent.prototype.handleFollowers = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_12__followers_followers_component__["a" /* FollowersComponent */], {
            width: '50em'
        });
    };
    SideNavComponent.prototype.signOut = function () {
        var _this = this;
        this.spinnerService.show();
        this.auth.signOut().then(function (res) {
            _this.loginActive = false;
            _this.userEmail = '';
            localStorage.removeItem('token');
            _this.spinnerService.hide();
        });
    };
    SideNavComponent.prototype.login = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */], {
            width: '30em',
            data: {
                authLabel: 'LoginLabel',
                language: this.language
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (!!result.login) {
                _this.userInfo.emit(result);
                _this.userEmail = result.email;
                _this.loginActive = true;
                _this.displayName = result.displayName;
            }
        });
    };
    SideNavComponent.prototype.handleFavRecipes = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__favorite_recipe_component_favorite_recipe_component_component__["a" /* FavoriteRecipeComponentComponent */], {
            width: '30em',
            data: {
                user: this.userEmail
            }
        });
    };
    SideNavComponent.prototype.register = function () {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_11__login_login_component__["a" /* LoginComponent */], {
            width: '30em',
            data: {
                authLabel: 'registerLabel',
                language: this.language
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (!!result.login) {
                _this.userInfo.emit(result);
                _this.userEmail = result.email;
                _this.loginActive = true;
            }
        });
    };
    SideNavComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_10__settings_settings_component__["a" /* SettingsComponent */], {
            width: '50em'
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    SideNavComponent.prototype.handleMyRecipies = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_13__my_recipes_my_recipes_component__["a" /* MyRecipesComponent */], {
            width: '50em'
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    return SideNavComponent;
}());



/***/ }),

/***/ "./src/app/snack-bar/snack-bar.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [""];



/***/ }),

/***/ "./src/app/snack-bar/snack-bar.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_SnackBarComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_SnackBarComponent_0;
/* unused harmony export View_SnackBarComponent_Host_0 */
/* unused harmony export SnackBarComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__snack_bar_component_css_shim_ngstyle__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




var styles_SnackBarComponent = [__WEBPACK_IMPORTED_MODULE_0__snack_bar_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_SnackBarComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_SnackBarComponent, data: {} });

function View_SnackBarComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [], null, null); }
function View_SnackBarComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "app-snack-bar", [], null, null, null, View_SnackBarComponent_0, RenderType_SnackBarComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](1, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_2__snack_bar_component__["a" /* SnackBarComponent */], [__WEBPACK_IMPORTED_MODULE_3__angular_material_snack_bar__["b" /* MatSnackBar */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SnackBarComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-snack-bar", __WEBPACK_IMPORTED_MODULE_2__snack_bar_component__["a" /* SnackBarComponent */], View_SnackBarComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/snack-bar/snack-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");


var SnackBarComponent = /** @class */ (function () {
    function SnackBarComponent(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarComponent.prototype.ngOnInit = function () {
    };
    SnackBarComponent.prototype.openSnackBar = function (message) {
        this.snackBar.open(message, '', {
            duration: 2000
        });
    };
    return SnackBarComponent;
}());

;


/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.css.shim.ngstyle.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = [".border-round[_ngcontent-%COMP%]{\n  margin-bottom: 0.3em;\n  margin-top: 0.3em;\n  margin-left:1em;\n  padding: 1em;\n}\n.width-full[_ngcontent-%COMP%]{\n  width: 100%;\n}\n.media.row[_ngcontent-%COMP%]{\n  margin-bottom: 1em;\n}\n.pad-left-2[_ngcontent-%COMP%]{\n  padding-left: 2em;\n}\n.mar-top[_ngcontent-%COMP%]{\n  margin-top: 1em;\n}\n.label-centered[_ngcontent-%COMP%]{\n  margin: auto;\n  width: 50%;\n  padding: 1px;\n}\n.filterGroup[_ngcontent-%COMP%]{\n  margin-right: 1em;\n}\n.border-round[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%]{\n  border-radius: 0.2em;\n}\n.media-left[_ngcontent-%COMP%]{\n}\n.mar-right[_ngcontent-%COMP%]{\n  margin-right: 1em;\n}\n.btn-danger.mar-right[_ngcontent-%COMP%]{\n  margin-right: 1em;\n}\n.mar-left[_ngcontent-%COMP%]{\n  margin-left: 1em;\n}\n.tooltip-host[_ngcontent-%COMP%] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 50px;\n}\n@media (min-width: 768px){\n  .border-round[_ngcontent-%COMP%] {\n    margin-left: 0.2em;\n    margin-right: 2.5em;\n  }\n}\n@media ( min-width:  320px){\n\n}\n@media (max-width: 425px){\n  .border-round[_ngcontent-%COMP%]{\n    border-top: 0;\n    padding-left: 2em;\n    margin-left: 0;\n  }\n  .mar-right[_ngcontent-%COMP%] {\n    margin-right: 2em;\n  }\n}\n@media(min-width: 992px) {\n  .pad-left[_ngcontent-%COMP%]{\n    padding-left: 4em;\n  }\n  .pad-left-2[_ngcontent-%COMP%]{\n    padding-left: 7em;\n  }\n  .border-round[_ngcontent-%COMP%]{\n    margin-left: 0;\n    margin-left:3em;\n  }\n\n}\n@media (min-width: 1024px) and (max-width: 1250px){\n    .media-body[_ngcontent-%COMP%]{\n      margin-left: 2em;\n    }\n  .mar-left[_ngcontent-%COMP%] {\n    margin-left: 0;\n  }\n}\n.btn[_ngcontent-%COMP%]{\n  margin-bottom: 0.5em;\n}\n.scroll-to-top[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 15px;\n  right: 15px;\n  opacity: 0;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out;\n}\n.show-scroll[_ngcontent-%COMP%] {\n  opacity: 1;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out;\n}"];



/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.ngfactory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_ViewRecipeComponent; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_ViewRecipeComponent_0;
/* unused harmony export View_ViewRecipeComponent_Host_0 */
/* unused harmony export ViewRecipeComponentNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view_recipe_component_css_shim_ngstyle__ = __webpack_require__("./src/app/view-recipe/view-recipe.component.css.shim.ngstyle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/button/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__ = __webpack_require__("./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__ = __webpack_require__("./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__ = __webpack_require__("./node_modules/@ngx-translate/core/src/translate.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_card_typings_index_ngfactory__ = __webpack_require__("./node_modules/@angular/material/card/typings/index.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_card__ = __webpack_require__("./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nutrient_dialog_nutrient_dialog_component_ngfactory__ = __webpack_require__("./src/app/nutrient-dialog/nutrient-dialog.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__nutrient_dialog_nutrient_dialog_component__ = __webpack_require__("./src/app/nutrient-dialog/nutrient-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ng_bootstrap_ng_bootstrap_tooltip_tooltip__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__ = __webpack_require__("./node_modules/@ng-bootstrap/ng-bootstrap/tooltip/tooltip-config.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__snack_bar_snack_bar_component_ngfactory__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng4_loading_spinner__ = __webpack_require__("./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng4_loading_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_ng4_loading_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_database_service_service__ = __webpack_require__("./src/app/services/database-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__view_recipe_component__ = __webpack_require__("./src/app/view-recipe/view-recipe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



























var styles_ViewRecipeComponent = [__WEBPACK_IMPORTED_MODULE_0__view_recipe_component_css_shim_ngstyle__["a" /* styles */]];
var RenderType_ViewRecipeComponent = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵcrt"]({ encapsulation: 0, styles: styles_ViewRecipeComponent, data: {} });

function View_ViewRecipeComponent_2(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "a", [["class", "dropdown-item"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getFilterResults(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_ViewRecipeComponent_1(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 37, "div", [["class", "row pad-left-2 width-full"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 17, "div", [["class", "btn-group filterGroup col-xs-12"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 3, "button", [["aria-expanded", "false"], ["aria-haspopup", "true"], ["class", "btn btn-default dropdown-toggle"], ["color", "warn"], ["data-toggle", "dropdown"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](6, 0, ["\n      ", "\n    "])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 9, "div", [["class", "dropdown-menu"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](11, 0, null, null, 1, "a", [["class", "dropdown-item"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getFilterResults("Relavence") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 0, "div", [["class", "dropdown-divider"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_ViewRecipeComponent_2)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](17, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 15, "div", [["class", "btn-group filterGroup col-xs-12"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](23, 0, null, null, 3, "button", [["aria-expanded", "false"], ["aria-haspopup", "true"], ["class", "btn btn-default dropdown-toggle"], ["color", "warn"], ["data-toggle", "dropdown"], ["mat-raised-button", ""], ["type", "button"]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](24, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](25, 0, ["\n      ", "\n    "])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](28, 0, null, null, 7, "div", [["class", "dropdown-menu"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, null, 1, "a", [["class", "dropdown-item"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getSortResults("ASC") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, null, 1, "a", [["class", "dropdown-item"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.getSortResults("DESC") !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = "warn"; _ck(_v, 5, 0, currVal_1); var currVal_4 = _co.getFilterList(); _ck(_v, 17, 0, currVal_4); var currVal_6 = "warn"; _ck(_v, 24, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).disabled || null); _ck(_v, 4, 0, currVal_0); var currVal_2 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 6, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 7).transform(_co.filterValue)); _ck(_v, 6, 0, currVal_2); var currVal_3 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 11, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 12).transform("ReleavenceLabel")); _ck(_v, 11, 0, currVal_3); var currVal_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 24).disabled || null); _ck(_v, 23, 0, currVal_5); var currVal_7 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 25, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 26).transform(_co.sortValue)); _ck(_v, 25, 0, currVal_7); var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 30, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 31).transform("LowToHighLabel")); _ck(_v, 30, 0, currVal_8); var currVal_9 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 33, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 34).transform("HighToLowLabel")); _ck(_v, 33, 0, currVal_9); }); }
function View_ViewRecipeComponent_4(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 1, "li", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](1, null, ["\n              ", "\n            "]))], null, function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }); }
function View_ViewRecipeComponent_3(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 52, "div", [["class", "border-round recipeCard col-xs-12 col-sm-12 col-md-12 col-lg-5"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 49, "mat-card", [["class", "mat-card"]], null, null, null, __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_card_typings_index_ngfactory__["b" /* View_MatCard_0 */], __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_material_card_typings_index_ngfactory__["a" /* RenderType_MatCard */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](3, 49152, null, 0, __WEBPACK_IMPORTED_MODULE_10__angular_material_card__["a" /* MatCard */], [], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](5, 0, null, 0, 45, "div", [["class", "media row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](7, 0, null, null, 3, "div", [["class", "media-left col-xs-12 col-sm-12 col-md-12 col-lg-4"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](9, 0, null, null, 0, "img", [["alt", "..."], ["class", "media-object"], ["height", "150px"], ["width", "150px"]], [[8, "src", 4]], null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](12, 0, null, null, 4, "div", [["class", "media-body col-xs-12 col-sm-12 col-md-12 col-lg-5"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](14, 0, null, null, 1, "h4", [["class", "media-heading"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](15, null, ["", ""])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](18, 0, null, null, 21, "div", [["class", "col-xs-12 col-sm-12 col-lg-12 mar-left mar-top mar-right"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](20, 0, null, null, 18, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](22, 0, null, null, 1, "app-nutrient-dialog", [], null, null, null, __WEBPACK_IMPORTED_MODULE_11__nutrient_dialog_nutrient_dialog_component_ngfactory__["c" /* View_NutrientDialogComponent_0 */], __WEBPACK_IMPORTED_MODULE_11__nutrient_dialog_nutrient_dialog_component_ngfactory__["b" /* RenderType_NutrientDialogComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](23, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_12__nutrient_dialog_nutrient_dialog_component__["a" /* NutrientDialogComponent */], [__WEBPACK_IMPORTED_MODULE_13__angular_material_dialog__["e" /* MatDialog */]], { nutrients: [0, "nutrients"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](25, 0, null, null, 6, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.handleUrlChange(_v.context.$implicit.recipieUrl) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](27, 16777216, null, null, 4, "button", [["class", "btn btn-success"], ["color", "accent"], ["mat-raised-button", ""], ["ngbTooltip", "View Website"]], [[8, "disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](28, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](29, 212992, null, 0, __WEBPACK_IMPORTED_MODULE_14__ng_bootstrap_ng_bootstrap_tooltip_tooltip__["a" /* NgbTooltip */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ComponentFactoryResolver"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_15__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"]], { ngbTooltip: [0, "ngbTooltip"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](30, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["visibility"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](33, 0, null, null, 4, "button", [["mat-icon-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.addToFav(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](34, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](35, 0, null, 0, 2, "i", [], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](36, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { ngClass: [0, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](37, { "fas": 0, "far": 1, "fa-heart": 2 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](41, 0, null, null, 8, "div", [["class", "media-row"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](43, 0, null, null, 5, "ul", [], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n            "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 2, null, View_ViewRecipeComponent_4)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](46, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["s" /* SlicePipe */], []), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n          "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n        "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "]))], function (_ck, _v) { var currVal_2 = _v.context.$implicit.nutrients; _ck(_v, 23, 0, currVal_2); var currVal_4 = "accent"; _ck(_v, 28, 0, currVal_4); var currVal_5 = "View Website"; _ck(_v, 29, 0, currVal_5); var currVal_7 = _ck(_v, 37, 0, _v.context.$implicit.favorite, !_v.context.$implicit.favorite, true); _ck(_v, 36, 0, currVal_7); var currVal_8 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 46, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 47).transform(_v.context.$implicit.ingredients, 0, 5)); _ck(_v, 46, 0, currVal_8); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵinlineInterpolate"](1, "", _v.context.$implicit.image, ""); _ck(_v, 9, 0, currVal_0); var currVal_1 = _v.context.$implicit.title; _ck(_v, 15, 0, currVal_1); var currVal_3 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 28).disabled || null); _ck(_v, 27, 0, currVal_3); var currVal_6 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 34).disabled || null); _ck(_v, 33, 0, currVal_6); }); }
function View_ViewRecipeComponent_5(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 8, "div", [["class", "row label-centered"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](2, 0, null, null, 5, "div", [["class", "col-xs-12 col-md-12 col-sm-12 col-lg-12 text-center"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 2, "button", [["class", "btn btn-default"], ["color", "primary"], ["mat-raised-button", ""]], [[8, "innerHTML", 1], [8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.recipes.pollRecipeData() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpid"](131072, __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core_src_translate_pipe__["a" /* TranslatePipe */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"]]), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var currVal_2 = "primary"; _ck(_v, 5, 0, currVal_2); }, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵunv"](_v, 4, 0, __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 6).transform("SeeMoreRecipesLabel")); var currVal_1 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).disabled || null); _ck(_v, 4, 0, currVal_0, currVal_1); }); }
function View_ViewRecipeComponent_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵqud"](402653184, 1, { snackBarRef: 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_ViewRecipeComponent_1)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](2, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](4, 0, null, null, 4, "div", [["class", "row pad-left"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_ViewRecipeComponent_3)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](7, 802816, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["j" /* NgForOf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵand"](16777216, null, null, 1, null, View_ViewRecipeComponent_5)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](11, 16384, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["k" /* NgIf */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["TemplateRef"]], { ngIf: [0, "ngIf"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](13, 0, null, null, 1, "app-snack-bar", [], null, null, null, __WEBPACK_IMPORTED_MODULE_16__snack_bar_snack_bar_component_ngfactory__["b" /* View_SnackBarComponent_0 */], __WEBPACK_IMPORTED_MODULE_16__snack_bar_snack_bar_component_ngfactory__["a" /* RenderType_SnackBarComponent */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](14, 114688, [[1, 4]], 0, __WEBPACK_IMPORTED_MODULE_17__snack_bar_snack_bar_component__["a" /* SnackBarComponent */], [__WEBPACK_IMPORTED_MODULE_18__angular_material_snack_bar__["b" /* MatSnackBar */]], null, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](17, 0, null, null, 10, "div", [["class", "scroll-to-top"]], null, null, null, null, null)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](18, 278528, null, 0, __WEBPACK_IMPORTED_MODULE_8__angular_common__["i" /* NgClass */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["IterableDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["KeyValueDiffers"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer2"]], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵpod"](19, { "show-scroll": 0 }), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](21, 0, null, null, 5, "button", [["color", "primary"], ["mat-mini-fab", ""]], [[8, "disabled", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.scrollToTop() !== false);
        ad = (pd_0 && ad);
    } return ad; }, __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["b" /* View_MatButton_0 */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material_button_typings_index_ngfactory__["a" /* RenderType_MatButton */])), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](22, 180224, null, 0, __WEBPACK_IMPORTED_MODULE_3__angular_material_button__["b" /* MatButton */], [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_4__angular_cdk_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__angular_cdk_a11y__["j" /* FocusMonitor */]], { color: [0, "color"] }, null), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n      "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](24, 0, null, 0, 1, "i", [["class", "material-icons"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["arrow_upward"])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, 0, ["\n    "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n  "])), (_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵted"](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.recipes.RecipeObject["length"] > 0); _ck(_v, 2, 0, currVal_0); var currVal_1 = _co.recipes.RecipeObject; _ck(_v, 7, 0, currVal_1); var currVal_2 = (_co.recipes.RecipeObject["length"] > 0); _ck(_v, 11, 0, currVal_2); _ck(_v, 14, 0); var currVal_3 = "scroll-to-top"; var currVal_4 = _ck(_v, 19, 0, _co.navIsFixed); _ck(_v, 18, 0, currVal_3, currVal_4); var currVal_6 = "primary"; _ck(_v, 22, 0, currVal_6); }, function (_ck, _v) { var currVal_5 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 22).disabled || null); _ck(_v, 21, 0, currVal_5); }); }
function View_ViewRecipeComponent_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵvid"](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵeld"](0, 0, null, null, 5, "app-view-recipe", [], null, [["window", "scroll"]], function (_v, en, $event) { var ad = true; if (("window:scroll" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵnov"](_v, 5).onWindowScroll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_ViewRecipeComponent_0, RenderType_ViewRecipeComponent)), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](4608, null, __WEBPACK_IMPORTED_MODULE_15__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], __WEBPACK_IMPORTED_MODULE_15__ng_bootstrap_ng_bootstrap_tooltip_tooltip_config__["a" /* NgbTooltipConfig */], []), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_19__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_19__recipe_service__["a" /* RecipeService */], [__WEBPACK_IMPORTED_MODULE_20__angular_common_http__["c" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_21_ng4_loading_spinner__["Ng4LoadingSpinnerService"]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */], [__WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵprd"](512, null, __WEBPACK_IMPORTED_MODULE_23__services_database_service_service__["a" /* DatabaseServiceService */], __WEBPACK_IMPORTED_MODULE_23__services_database_service_service__["a" /* DatabaseServiceService */], [__WEBPACK_IMPORTED_MODULE_24_angularfire2_database__["a" /* AngularFireDatabase */]]), __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵdid"](5, 114688, null, 0, __WEBPACK_IMPORTED_MODULE_25__view_recipe_component__["a" /* ViewRecipeComponent */], [__WEBPACK_IMPORTED_MODULE_19__recipe_service__["a" /* RecipeService */], __WEBPACK_IMPORTED_MODULE_26__angular_platform_browser__["b" /* DOCUMENT */], __WEBPACK_IMPORTED_MODULE_22__Content_AppGlobal__["a" /* AppGlobal */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core_src_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_24_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_23__services_database_service_service__["a" /* DatabaseServiceService */]], null, null)], function (_ck, _v) { _ck(_v, 5, 0); }, null); }
var ViewRecipeComponentNgFactory = __WEBPACK_IMPORTED_MODULE_1__angular_core__["ɵccf"]("app-view-recipe", __WEBPACK_IMPORTED_MODULE_25__view_recipe_component__["a" /* ViewRecipeComponent */], View_ViewRecipeComponent_Host_0, { recipes: "recipes", user: "user" }, {}, []);



/***/ }),

/***/ "./src/app/view-recipe/view-recipe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewRecipeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_service__ = __webpack_require__("./src/app/recipe.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Models_recipeModel__ = __webpack_require__("./src/app/Models/recipeModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Content_AppGlobal__ = __webpack_require__("./src/app/Content/AppGlobal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__("./node_modules/angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_firestore__ = __webpack_require__("./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Models_UserModel__ = __webpack_require__("./src/app/Models/UserModel.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_database_service_service__ = __webpack_require__("./src/app/services/database-service.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__snack_bar_snack_bar_component__ = __webpack_require__("./src/app/snack-bar/snack-bar.component.ts");










var ViewRecipeComponent = /** @class */ (function () {
    function ViewRecipeComponent(recipeService, document, appGlobal, translate, db, foodDb) {
        this.recipeService = recipeService;
        this.document = document;
        this.appGlobal = appGlobal;
        this.translate = translate;
        this.db = db;
        this.foodDb = foodDb;
        this.ingredient = '';
    }
    ViewRecipeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recipes = new __WEBPACK_IMPORTED_MODULE_2__Models_recipeModel__["a" /* RecipeModel */]({
            RecipeObject: []
        });
        this.translate.setDefaultLang(this.appGlobal.defaultContent);
        this.translate.get('FilterLabel').subscribe(function (res) {
            _this.filterValue = res;
        });
        this.translate.get('SortLabel').subscribe(function (res) {
            console.log(res);
            _this.sortValue = res;
        });
    };
    ViewRecipeComponent.prototype.getFilterList = function () {
        return this.recipes.getFilterList();
    };
    ViewRecipeComponent.prototype.handleUrlChange = function (url) {
        window.open(url, '_blank');
    };
    ViewRecipeComponent.prototype.getFilterResults = function (filterType) {
        this.filterValue = filterType;
        this.recipes.getFilteredItem(filterType);
    };
    ViewRecipeComponent.prototype.addToFav = function (obj) {
        var _this = this;
        this.foodDb.addToFav(obj, this.user['email']).then(function (res) {
            _this.snackBarRef.openSnackBar('Recipe added to favorites');
        });
    };
    ViewRecipeComponent.prototype.getSortResults = function (sortType) {
        var sortTypeMap = {
            'ASC': 'Low to High',
            'DESC': 'High to Low'
        };
        this.sortValue = sortTypeMap[sortType];
        this.recipes.getSortResults(sortType, this.filterValue);
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
    dev: true,
    firebaseConfig: {
        apiKey: "AIzaSyB1JSIvCrkz_82kvSkqTM-1gzJROSg16fk",
        authDomain: "myrecipesearch-c52aa.firebaseapp.com",
        databaseURL: "https://myrecipesearch-c52aa.firebaseio.com",
        projectId: "myrecipesearch-c52aa",
        storageBucket: "",
        messagingSenderId: "1041313927441"
    },
    googleCreds: {
        key: "1041313927441-2u9bt6ndo4drnv3hnghsubd3qna3rrvb.apps.googleusercontent.com",
        secret: "AmCBW-pOpsEZa_JMnhMKEP2T"
    },
    googleCloudVisionAPIKey: "AIzaSyCUiiGFM9vbof_TTe9bcN1sCKUQ6mnGJv4"
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module_ngfactory__ = __webpack_require__("./src/app/app.module.ngfactory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");




if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
var ɵ0 = function () {
    // Application Constructor
    this.initialize = function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        if (__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].dev) {
            this.receivedEvent('deviceready');
        }
    };
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    this.onDeviceReady = function () {
        delete window.open;
        // @ts-ignore
        window.open = cordova.InAppBrowser.open;
        this.receivedEvent('deviceready');
    };
    // Update DOM on a Received Event
    this.receivedEvent = function (id) {
        if (id = 'deviceready') {
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["j" /* platformBrowser */]().bootstrapModuleFactory(__WEBPACK_IMPORTED_MODULE_2__app_app_module_ngfactory__["a" /* AppModuleNgFactory */])
                .catch(function (err) { return console.log(err); });
        }
    };
    this.initialize();
};
var app = ɵ0.bind(this);
app();



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map