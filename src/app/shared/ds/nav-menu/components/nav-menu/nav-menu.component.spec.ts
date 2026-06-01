import { ComponentFixture, TestBed } from '@angular/core/types/testing';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavMenuComponent],
    });

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
