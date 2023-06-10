import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailViewComponent } from './post-detail-view.component';

describe('PostDetailViewComponent', () => {
  let component: PostDetailViewComponent;
  let fixture: ComponentFixture<PostDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
