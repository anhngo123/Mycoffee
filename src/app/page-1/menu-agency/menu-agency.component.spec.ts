import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgencyComponent } from './menu-agency.component';

describe('MenuAgencyComponent', () => {
  let component: MenuAgencyComponent;
  let fixture: ComponentFixture<MenuAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAgencyComponent]
    });
    fixture = TestBed.createComponent(MenuAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
