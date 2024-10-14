import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDetails']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(LoginGuard);
    userServiceMock = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to /todo and return false if user is logged in', () => {
    userServiceMock.getUserDetails.and.returnValue({ 
      id: 1, // Ensure this is included
      userId: 1, 
      name: 'Test User', 
      email: 'testuser@example.com', 
      password: 'password123'
    });

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/todo']);
  });

  it('should return true if user is not logged in', () => {
    userServiceMock.getUserDetails.and.returnValue(null); // Simulating no user logged in

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
