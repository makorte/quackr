import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostButtonComponent } from './create-post-button.component';

describe('CreatePostButtonComponent', () => {
  let component: CreatePostButtonComponent;
  let fixture: ComponentFixture<CreatePostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
