import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherAgencyComponent } from './voucher-agency.component';

describe('VoucherAgencyComponent', () => {
  let component: VoucherAgencyComponent;
  let fixture: ComponentFixture<VoucherAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherAgencyComponent]
    });
    fixture = TestBed.createComponent(VoucherAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
