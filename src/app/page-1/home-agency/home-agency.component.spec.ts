import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAgencyComponent } from './home-agency.component';

describe('HomeAgencyComponent', () => {
  let component: HomeAgencyComponent;
  let fixture: ComponentFixture<HomeAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAgencyComponent]
    });
    fixture = TestBed.createComponent(HomeAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
