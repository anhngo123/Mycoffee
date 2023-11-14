import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAgencyComponent } from './ingredient-agency.component';

describe('IngredientAgencyComponent', () => {
  let component: IngredientAgencyComponent;
  let fixture: ComponentFixture<IngredientAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientAgencyComponent]
    });
    fixture = TestBed.createComponent(IngredientAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
