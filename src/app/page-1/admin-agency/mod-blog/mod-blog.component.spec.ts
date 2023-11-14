import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModBlogComponent } from './mod-blog.component';

describe('ModBlogComponent', () => {
  let component: ModBlogComponent;
  let fixture: ComponentFixture<ModBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModBlogComponent]
    });
    fixture = TestBed.createComponent(ModBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
