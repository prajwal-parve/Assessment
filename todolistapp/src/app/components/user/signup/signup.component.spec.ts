import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { SignupComponent } from './signup.component';
import { of, throwError } from 'rxjs';

class MockUserService {
  SignupUser(value: any) {
    return of({}); // Mock successful signup
  }
}

class MockToastrService {
  success(message: string) {}
  error(message: string) {}
}

class MockRouter {
  navigateByUrl(url: string) {}
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UserService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignupComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when controls are empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should validate form controls', () => {
    const nameControl = component.signupForm.get('name');
    const mobileControl = component.signupForm.get('mobile');
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('password');

    nameControl?.setValue('');
    mobileControl?.setValue('123'); // Invalid mobile
    emailControl?.setValue('invalid-email');
    passwordControl?.setValue('12345'); // Invalid password

    expect(nameControl?.valid).toBeFalsy();
    expect(mobileControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should call SignupUser on form submission', () => {
    const signupSpy = spyOn(userService, 'SignupUser').and.callThrough();
    const navigateSpy = spyOn(router, 'navigateByUrl');
    
    component.signupForm.setValue({
      name: 'Test User',
      mobile: '1234567890',
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(signupSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  });

  it('should display error message on signup failure', () => {
    spyOn(userService, 'SignupUser').and.returnValue(throwError(() => new Error('Signup failed')));
    spyOn(toastrService, 'error');

    component.signupForm.setValue({
      name: 'Test User',
      mobile: '1234567890',
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(toastrService.error).toHaveBeenCalledWith('Signup failed. Please try again later.');
  });
});
