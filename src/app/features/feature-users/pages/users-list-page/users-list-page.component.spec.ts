import { of } from 'rxjs';
import { UsersService } from '@api/controllers/users';
import { UsersListPageComponent } from './users-list-page.component';
import { ComponentFixture, TestBed } from '@angular/core/types/testing';

describe('UsersListPageComponent', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersListPageComponent],
      providers: [
        {
          provide: UsersService,
          useValue: { getAllUsers: () => of([]) },
        },
      ],
    });

    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
