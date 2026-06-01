import { of, throwError } from 'rxjs';
import { UsersService } from '@api/controllers/users';
import { ModalService } from '@shared/ds/modal';
import { ERole, IUser } from '@shared/models';
import { UsersListPageComponent } from './users-list-page.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const MOCK_USERS: IUser[] = [
  {
    age: 30,
    role: ERole.Client,
    address: { street: 'Main St', suite: 'Apt 1', city: 'New York', zipcode: '10001' },
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    age: 30,
    role: ERole.Client,
    address: { street: 'Main St', suite: 'Apt 1', city: 'New York', zipcode: '10001' },
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
  {
    age: 30,
    role: ERole.Client,
    address: { street: 'Main St', suite: 'Apt 1', city: 'New York', zipcode: '10001' },
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
  },
];

describe('UsersListPageComponent', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  let usersService: jest.Mocked<UsersService>;
  let modalService: jest.Mocked<ModalService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersListPageComponent],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockReturnValue(of(MOCK_USERS)),
            updateUser: jest.fn().mockReturnValue(of(MOCK_USERS[0])),
          },
        },
        {
          provide: ModalService,
          useValue: {
            open: jest.fn().mockReturnValue(of(undefined)),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.flushEffects();

    usersService = TestBed.inject(UsersService) as jest.Mocked<UsersService>;
    modalService = TestBed.inject(ModalService) as jest.Mocked<ModalService>;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Model', () => {
    describe('filteredUsers', () => {
      it('should return all users when search is empty', () => {
        expect(component['filteredUsers']()).toEqual(MOCK_USERS);
      });

      it('should filter users by name (case-insensitive)', () => {
        jest.useFakeTimers();
        component['searchControl'].setValue('john');
        jest.advanceTimersByTime(200);
        TestBed.flushEffects();

        const result = component['filteredUsers']();

        expect(result).toHaveLength(2);
        expect(result.map((u: IUser) => u.name)).toEqual(
          expect.arrayContaining(['John Doe', 'Bob Johnson']),
        );
      });

      it('should return empty array when no users match search', () => {
        jest.useFakeTimers();
        component['searchControl'].setValue('xyz not existing');
        jest.advanceTimersByTime(200);
        TestBed.flushEffects();

        expect(component['filteredUsers']()).toHaveLength(0);
      });

      it('should trim whitespace from search query before filtering', () => {
        jest.useFakeTimers();
        component['searchControl'].setValue('  jane  ');
        jest.advanceTimersByTime(200);
        TestBed.flushEffects();

        const result = component['filteredUsers']();
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Jane Smith');
      });
    });

    describe('hasFilter', () => {
      it('should be false when search is empty', () => {
        expect(component['hasFilter']()).toBe(false);
      });

      it('should be true when search has a value', () => {
        jest.useFakeTimers();
        component['searchControl'].setValue('test');
        jest.advanceTimersByTime(200);
        TestBed.flushEffects();

        expect(component['hasFilter']()).toBe(true);
      });
    });

    describe('isLoading', () => {
      it('should be false after users are loaded', () => {
        expect(component['isLoading']()).toBe(false);
      });
    });

    describe('editUser', () => {
      it('should open edit dialog with the user data', () => {
        const user = MOCK_USERS[0];

        component['editUser'](user);

        expect(modalService.open).toHaveBeenCalledWith(EditUserDialogComponent, user);
      });

      it('should not call updateUser when dialog is cancelled', () => {
        modalService.open.mockReturnValue(of(undefined));

        component['editUser'](MOCK_USERS[0]);

        expect(usersService.updateUser).not.toHaveBeenCalled();
      });

      it('should optimistically update user in local list when dialog confirms', () => {
        const user = MOCK_USERS[0];
        const updatedUser: IUser = { ...user, name: 'John Updated' };
        modalService.open.mockReturnValue(of(updatedUser));
        usersService.updateUser.mockReturnValue(of(updatedUser));

        component['editUser'](user);
        TestBed.flushEffects();

        const found = component['filteredUsers']().find((u: IUser) => u.id === user.id);
        expect(found?.name).toBe('John Updated');
      });

      it('should call updateUser with edited data when dialog confirms', () => {
        const user = MOCK_USERS[1];
        const updatedUser: IUser = { ...user, name: 'Jane Updated' };
        modalService.open.mockReturnValue(of(updatedUser));
        usersService.updateUser.mockReturnValue(of(updatedUser));

        component['editUser'](user);

        expect(usersService.updateUser).toHaveBeenCalledWith(updatedUser);
      });

      it('should reload user list when updateUser fails', () => {
        const user = MOCK_USERS[0];
        const updatedUser: IUser = { ...user, name: 'John Updated' };
        modalService.open.mockReturnValue(of(updatedUser));
        usersService.updateUser.mockReturnValue(throwError(() => new Error('Update failed')));

        component['editUser'](user);
        TestBed.flushEffects();

        expect(usersService.getAllUsers).toHaveBeenCalledTimes(2);
      });

      it('should not modify list for other users when editing', () => {
        const userToEdit = MOCK_USERS[0];
        const updatedUser: IUser = { ...userToEdit, name: 'John Updated' };
        modalService.open.mockReturnValue(of(updatedUser));
        usersService.updateUser.mockReturnValue(of(updatedUser));

        component['editUser'](userToEdit);
        TestBed.flushEffects();

        const users = component['filteredUsers']();
        expect(users.find((u: IUser) => u.id === MOCK_USERS[1].id)?.name).toBe(MOCK_USERS[1].name);
        expect(users.find((u: IUser) => u.id === MOCK_USERS[2].id)?.name).toBe(MOCK_USERS[2].name);
      });
    });
  });
});
