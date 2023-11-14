import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModAgencyComponent } from './mod-agency.component';

describe('ModAgencyComponent', () => {
  let component: ModAgencyComponent;
  let fixture: ComponentFixture<ModAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModAgencyComponent]
    });
    fixture = TestBed.createComponent(ModAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
