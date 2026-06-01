import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavMenuItemComponent } from './nav-menu-item.component';

describe('NavMenuItemComponent', () => {
  let component: NavMenuItemComponent;
  let fixture: ComponentFixture<NavMenuItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavMenuItemComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(NavMenuItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
