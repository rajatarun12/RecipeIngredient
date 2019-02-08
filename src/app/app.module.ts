import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { environment } from '../environments/environment';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RouterModule, Routes } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { IngredientCheckDirective } from './directives/validators/ingredient-check.directive';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {
  MatSidenavModule, MatInputModule, MatDialogModule, MatCardModule, MatSnackBarModule, MatExpansionModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatChipsModule, MatListModule, MatTabsModule, MatSlideToggleModule
} from '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import {NutrientDialogTemplate, NutrientDialogComponent} from './nutrient-dialog/nutrient-dialog.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFirestoreModule} from "angularfire2/firestore";
import { FavoriteRecipeComponentComponent } from './favorite-recipe-component/favorite-recipe-component.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import {SettingsComponent} from './settings/settings.component';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import {LoginComponent} from './login/login.component';
import { FollowersComponent } from './followers/followers.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import {HttpModule} from '@angular/http';
import { RecipeSliderComponent } from './recipe-slider/recipe-slider.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { FollowerInfoComponent } from './follower-info/follower-info.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SafePipe } from './safe.pipe';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';


const appRoutes = [
  {path: '', redirectTo: 'recipeSearch/search/en', pathMatch: 'full'},
  {path : 'recipeSearch/search/:language', component: RecipeSearchComponent},
  {path : 'recipeSearch/favorites', component: FavoriteRecipeComponentComponent},
  {path : 'recipeSearch/dashboard', component: DashboardComponent}
];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://s3.us-east-2.amazonaws.com/locale-content/', '.json');
}
@NgModule({
  declarations: [
    AppComponent, SearchComponent,SettingsComponent,LoginComponent, ViewRecipeComponent, RecipeSearchComponent, SideNavComponent, NutrientDialogComponent, NutrientDialogTemplate, FooterComponentComponent, FavoriteRecipeComponentComponent, SnackBarComponent, NotificationMenuComponent, FollowersComponent, MyRecipesComponent, RecipeSliderComponent, RecipeInfoComponent, FollowerInfoComponent, PrivacyPolicyComponent, SafePipe, GooglemapsComponent, FooterComponent, DashboardComponent, RecipeTileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    Ng2GoogleChartsModule,
    MatListModule,
    HttpModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMenuModule,
    MatChipsModule,
    MatNativeDateModule,
    AngularFirestoreModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, {useHash: true}
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule
  ],
  exports: [ViewRecipeComponent, SearchComponent, MatSidenavModule, MatInputModule, MatDialogModule,MatCardModule],
  entryComponents: [NutrientDialogTemplate, GooglemapsComponent, PrivacyPolicyComponent,FollowerInfoComponent , FavoriteRecipeComponentComponent, SettingsComponent, LoginComponent, FollowersComponent, MyRecipesComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
