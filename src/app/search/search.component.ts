import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {RecipeModel} from '../Models/recipeModel';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AppGlobal} from '../Content/AppGlobal';
import {TranslateService} from '@ngx-translate/core';
import {GoogleCloudVisionService} from '../services/google-cloud-vision.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';


interface Cuisine {
  value: string;
  viewValue: string;
}
interface GoogleImageResponse {
  _body: object;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [AppGlobal, NgbTooltipConfig, GoogleCloudVisionService]
})
export class SearchComponent implements OnInit {
  @Output() sendRecipes = new EventEmitter<any>();
  @ViewChild('imageElement', { static: true })
  ie: ElementRef;
  imageSearchData: any = [];
  recipes: RecipeModel = new RecipeModel({
    RecipeObject: []
  });
  selectable = true;
  removable = true;
  ingredients: string;
  values: string[] = [];
  public myForm: FormGroup;
  collapsed = true;
  itemsGroup: FormArray;
  constructor(private fb: FormBuilder,
              private recipeService: RecipeService,
              private spinnerService: Ng4LoadingSpinnerService,
              public appGlobal: AppGlobal,
              public translate: TranslateService,
              private vision: GoogleCloudVisionService,
              private ref: ChangeDetectorRef) { }

  cuisines: Cuisine[] = [
    {value: 'American', viewValue: 'American'},
    {value: 'Nordic', viewValue: 'Nordic'},
    {value: 'Caribbean', viewValue: 'Caribbean'},
    {value: 'Asian', viewValue: 'Asian'},
    {value: 'Kosher', viewValue: 'Kosher'},
    {value: 'South American', viewValue: 'South American'},
    {value: 'Eastern Europe', viewValue: 'Eastern Europe'},
    {value: 'Central Europe', viewValue: 'Central Europe'},
    {value: 'Middle Eastern', viewValue: 'Middle Eastern'},
    {value: 'British', viewValue: 'British'},
    {value: 'French', viewValue: 'French'},
    {value: 'Chinese', viewValue: 'Chinese'},
    {value: 'Japanese', viewValue: 'Japanese'},
    {value: 'Indian', viewValue: 'Indian'},
    {value: 'Italian', viewValue: 'Italian'},
    {value: 'Mediterranean', viewValue: 'Mediterranean'},
    {value: 'Mexican', viewValue: 'Mexican'}
  ];
  dishTypes: Cuisine[] = [
    {value: 'Bread', viewValue: 'Bread'},
    {value: 'Cereals', viewValue: 'Cereals'},
    {value: 'Condiments and sauces', viewValue: 'Condiments and sauces'},
    {value: 'Drinks', viewValue: 'Drinks'},
    {value: 'Desserts', viewValue: 'Desserts'},
    {value: 'Main course', viewValue: 'Main course'},
    {value: 'Pancake', viewValue: 'Pancake'},
    {value: 'Preps', viewValue: 'Preps'},
    {value: 'Preserve', viewValue: 'Preserve'},
    {value: 'Salad', viewValue: 'Salad'},
    {value: 'Sandwiches', viewValue: 'Sandwiches'},
    {value: 'Side dish', viewValue: 'Side dish'},
    {value: 'Soup', viewValue: 'Soup'},
    {value: 'Starter', viewValue: 'Starter'},
    {value: 'Sweets', viewValue: 'Sweets'}
  ];
  mealTypes: Cuisine[] = [
    {value: 'Breakfast', viewValue: 'Breakfast'},
    {value: 'Lunch', viewValue: 'Lunch'},
    {value: 'Snack', viewValue: 'Snack'},
    {value: 'Dinner', viewValue: 'Dinner'},
  ];

  ngOnInit() {
    const self = this;
    this.myForm = this.fb.group({
        search: this.fb.control(null, null),
        cuisineType: this.fb.control(null, null),
        dishType: this.fb.control(null, null),
        mealType: this.fb.control(null, null)
    });
    this.translate.setDefaultLang(this.appGlobal.defaultContent);
    this.values = [];
  }

  addIngredients(event: any) {
    if (event.key === 'Enter') {
      this.values.push(event.target.value);
    }
  }

  searchPhoto(fromEvent) {
    const self = this;
    if (fromEvent && fromEvent.key !== 'Enter') {
      self.spinnerService.show();
      const fileCount: number = self.ie.nativeElement.files.length;
      const formData = new FormData();
      if (fileCount > 0) {
        const base64 = new FileReader();
        let res;
        base64.readAsBinaryString(self.ie.nativeElement.files[0]);
        setTimeout(() => {
          const str = base64.result.toString();
          res = btoa(str);
          self.vision.getLabels(res).subscribe((resp: any) => {
            self.imageSearchData = resp.responses[0].labelAnnotations;
            self.ref.detectChanges();
            self.spinnerService.hide();
          });
        }, 5000);
      }
    } else if (fromEvent) {
      self.ie.nativeElement.click();
    }
  }
  addIngredient(description) {
    this.itemsGroup = this.myForm.get('search') as FormArray;
    let descript =  this.itemsGroup.value[0].name;
    descript += description + ',';
    this.itemsGroup.controls[0].setValue({name: descript});
  }
  search(event: any) {
    if (event.x) {
      if (!this.values.length){
        this.itemsGroup = this.myForm.get('search') as FormArray;
        const val = this.itemsGroup.value[0].name;
        this.values.push(val);
      }
      const values = this.myForm;
      const ingredients = this.values.concat(',');
      ingredients.push(this.myForm.controls.cuisineType.value);
      ingredients.push(this.myForm.controls.mealType.value);
      ingredients.push(this.myForm.controls.dishType.value);
      this.ingredients = ingredients.toString();
      this.spinnerService.show();
      this.recipeService.getRecipe(this.ingredients).subscribe((result: any) => {
        this.spinnerService.hide();
        const count: number = result.count || 0;
        this.imageSearchData = [];
        const recipes = this.recipes.getRecipes(result.hits);
        this.sendRecipes.emit({
          recipes: new RecipeModel({
            RecipeObject: recipes,
            count,
            originalList: result,
            currentSearchQuery: this.ingredients
          }),
          ingredients: this.ingredients
        });
      });
    }
  }
  removeIngredient(index) {
    this.values.splice(index, 1);
  }
}
