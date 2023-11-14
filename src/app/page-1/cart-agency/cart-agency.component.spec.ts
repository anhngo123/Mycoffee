import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAgencyComponent } from './cart-agency.component';

describe('CartAgencyComponent', () => {
  let component: CartAgencyComponent;
  let fixture: ComponentFixture<CartAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartAgencyComponent]
    });
    fixture = TestBed.createComponent(CartAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
