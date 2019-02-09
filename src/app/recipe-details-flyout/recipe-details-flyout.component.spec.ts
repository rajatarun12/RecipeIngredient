import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsFlyoutComponent } from './recipe-details-flyout.component';

describe('RecipeDetailsFlyoutComponent', () => {
  let component: RecipeDetailsFlyoutComponent;
  let fixture: ComponentFixture<RecipeDetailsFlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsFlyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
