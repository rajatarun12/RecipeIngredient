import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRecipeComponentComponent } from './favorite-recipe-component.component';

describe('FavoriteRecipeComponentComponent', () => {
  let component: FavoriteRecipeComponentComponent;
  let fixture: ComponentFixture<FavoriteRecipeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteRecipeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRecipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
