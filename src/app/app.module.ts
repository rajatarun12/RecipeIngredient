import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { environment } from '../environments/environment';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RecipeSearchComponent } from './search/recipe-search/recipe-search.component';
import { RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {TranslateLoader, TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionPanelTitle} from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {NutrientDialogTemplate, NutrientDialogComponent} from './nutrient-dialog/nutrient-dialog.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire//auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SafePipe } from './safe.pipe';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';


const appRoutes = [
  {path: '', redirectTo: 'recipeSearch/search/en', pathMatch: 'full'},
  {path : 'recipeSearch/search/:language', component: RecipeSearchComponent}
];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://s3.us-east-2.amazonaws.com/locale-content/', '.json');
}
@NgModule({
  declarations: [
    AppComponent, SearchComponent, ViewRecipeComponent, RecipeSearchComponent, NutrientDialogComponent, NutrientDialogTemplate,
    SnackBarComponent, SafePipe, GooglemapsComponent, RecipeTileComponent
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
    MatFormFieldModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
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
  exports: [ViewRecipeComponent, SearchComponent, MatSidenavModule, MatInputModule, MatDialogModule, MatCardModule],
  entryComponents: [NutrientDialogTemplate, GooglemapsComponent, SnackBarComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
