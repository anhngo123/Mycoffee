import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAgencyComponent } from './blog-agency.component';

describe('BlogAgencyComponent', () => {
  let component: BlogAgencyComponent;
  let fixture: ComponentFixture<BlogAgencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogAgencyComponent]
    });
    fixture = TestBed.createComponent(BlogAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
