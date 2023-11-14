import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAgencyComponent } from './recipe-agency.component';

describe('RecipeAgencyComponent', () => {
  let component: RecipeAgencyComponent;
  let fixture: ComponentFixture<RecipeAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeAgencyComponent]
    });
    fixture = TestBed.createComponent(RecipeAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
