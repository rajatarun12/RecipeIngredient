import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSliderComponent } from './recipe-slider.component';

describe('RecipeSliderComponent', () => {
  let component: RecipeSliderComponent;
  let fixture: ComponentFixture<RecipeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
