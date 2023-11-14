import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAgencyComponent } from './dashboard-agency.component';

describe('DashboardAgencyComponent', () => {
  let component: DashboardAgencyComponent;
  let fixture: ComponentFixture<DashboardAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAgencyComponent]
    });
    fixture = TestBed.createComponent(DashboardAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
