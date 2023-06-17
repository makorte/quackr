import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostListComponent } from './user-post-list.component';

describe('PostListComponent', () => {
  let component: UserPostListComponent;
  let fixture: ComponentFixture<UserPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
