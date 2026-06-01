import { ComponentFixture, TestBed } from '@angular/core/types/testing';
import { NavMenuItemComponent } from './nav-menu-item.component';

describe('NavMenuItemComponent', () => {
  let component: NavMenuItemComponent;
  let fixture: ComponentFixture<NavMenuItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavMenuItemComponent],
    });

    fixture = TestBed.createComponent(NavMenuItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
