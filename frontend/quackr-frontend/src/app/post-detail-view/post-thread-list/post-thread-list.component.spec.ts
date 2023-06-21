import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostThreadListComponent} from './post-thread-list.component';

describe('PostThreadListComponent', () => {
  let component: PostThreadListComponent;
  let fixture: ComponentFixture<PostThreadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostThreadListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostThreadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
