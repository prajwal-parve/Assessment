import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from 'src/app/services/user.service'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/shared/user'; // Adjust the import based on your structure

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['LoginByEmail']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoginByEmail and navigate on successful login', () => {
    const user: User = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' }; // Adjust to User type
    component.loginForm.setValue({ email: user.email, password: user.password });

    userServiceMock.LoginByEmail.and.returnValue(of(user)); // Simulate successful login

    component.onSubmit();

    expect(userServiceMock.LoginByEmail).toHaveBeenCalledWith(user.email, user.password);
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Login Successful');
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/todo');
    expect(component.loginForm.value).toEqual({ email: '', password: '' }); // Check form reset
  });

  it('should show warning when form is invalid', () => {
    component.onSubmit();
    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  it('should show error message when login fails', () => {
    const user: User = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' }; // Adjust to User type
    component.loginForm.setValue({ email: user.email, password: user.password });

    userServiceMock.LoginByEmail.and.returnValue(throwError({ error: { message: 'Login failed' }})); // Simulate login failure

    component.onSubmit();

    expect(userServiceMock.LoginByEmail).toHaveBeenCalledWith(user.email, user.password);
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Login failed');
  });

  it('should show warning for invalid credentials', () => {
    const user: User = { id: 1, name: 'Test User', email: 'wrong@example.com', password: 'password123' }; // Adjust to User type
    component.loginForm.setValue({ email: user.email, password: user.password });

    userServiceMock.LoginByEmail.and.returnValue(of(null)); // Simulate invalid login response

    component.onSubmit();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Invalid email or password');
  });
});
