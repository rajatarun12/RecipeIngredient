import { Component, OnInit, OnChanges, Input, ViewChild} from '@angular/core';
import {RecipeModel} from '../Models/recipeModel';
import {DatabaseServiceService} from '../services/database-service.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import {RecipeDetailsFlyoutComponent} from '../recipe-details-flyout/recipe-details-flyout.component';
import {Overlay} from '@angular/cdk/overlay';
import {GooglemapsComponent} from '../googlemaps/googlemaps.component';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit,OnChanges {
  @Input() data: any;
  @ViewChild(SnackBarComponent)
  snackBarRef: SnackBarComponent;
  showResults: boolean;
  constructor(private foodDb: DatabaseServiceService,public dialog: MatDialog,public overlay: Overlay) { }
  user;

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('recipeSearchData'));
    this.user = user.user;
  }
  ngOnChanges() {
    this.showResults = true;
  }
  seemore() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.position = {'top': '0', 'right':'0'}
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth  = '50vw';
    dialogConfig.maxWidth  = '50vw';
    dialogConfig.height = '100%';
    dialogConfig.data = {
      recipe: this.data
    };
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();

    let dialogRef = this.dialog.open(RecipeDetailsFlyoutComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  addToFav(obj, evt) {
    this.foodDb.addToFav(obj, this.user['email']).then(res => {
      this.snackBarRef.openSnackBar('Recipe added to favorites');
      evt.srcElement.dataset.prefix = 'fas';
      console.log(evt);
    });
  }
  handleUrlChange(url){
    window.open(url, '_blank' );
  }
  handleNearby(title){
    const dialogRef = this.dialog.open(GooglemapsComponent, {
      width: '200em',
      data: {title: title}
    });
  }
}
