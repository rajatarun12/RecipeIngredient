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
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatChipsModule
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


const appRoutes = [
  {path: '', redirectTo: 'recipeSearch/en', pathMatch: 'full'},
  {path : 'recipeSearch/:language', component: RecipeSearchComponent}
];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://s3.us-east-2.amazonaws.com/locale-content/', '.json');
}
@NgModule({
  declarations: [
    AppComponent, SearchComponent,SettingsComponent,LoginComponent, ViewRecipeComponent, RecipeSearchComponent, SideNavComponent, NutrientDialogComponent, NutrientDialogTemplate, FooterComponentComponent, FavoriteRecipeComponentComponent, SnackBarComponent, NotificationMenuComponent, FollowersComponent, MyRecipesComponent
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
  entryComponents: [NutrientDialogTemplate,FavoriteRecipeComponentComponent, SettingsComponent, LoginComponent, FollowersComponent, MyRecipesComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
