import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuButtonComponent } from './side-menu-button.component';

describe('SideMenuButtonComponent', () => {
  let component: SideMenuButtonComponent;
  let fixture: ComponentFixture<SideMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
