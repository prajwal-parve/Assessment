import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testUser'); // Simulate logged-in user
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should deny access and redirect if user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simulate no user logged in
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
