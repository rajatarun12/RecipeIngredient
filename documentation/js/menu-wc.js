'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ingredient-recipe documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' : 'data-target="#xs-components-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' :
                                            'id="xs-components-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateRecipeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateRecipeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavoriteRecipeComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FavoriteRecipeComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FollowerInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FollowerInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FollowersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FollowersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GooglemapsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GooglemapsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyRecipesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyRecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NutrientDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NutrientDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NutrientDialogTemplate.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NutrientDialogTemplate</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrivacyPolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeDetailsFlyoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeDetailsFlyoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeSliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeTileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecipeTileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnackBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnackBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewRecipeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewRecipeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' : 'data-target="#xs-pipes-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' :
                                            'id="xs-pipes-links-module-AppModule-906f9887921233d7ffd251f43fd8e43c"' }>
                                            <li class="link">
                                                <a href="pipes/SafePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/RecipeModel.html" data-type="entity-link">RecipeModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpeechRecognitionService.html" data-type="entity-link">SpeechRecognitionService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppGlobal.html" data-type="entity-link">AppGlobal</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseServiceService.html" data-type="entity-link">DatabaseServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleCloudVisionService.html" data-type="entity-link">GoogleCloudVisionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link">RecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserModel.html" data-type="entity-link">UserModel</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserSettingsModel.html" data-type="entity-link">UserSettingsModel</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});