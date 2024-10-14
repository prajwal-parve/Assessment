import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, LoginComponent, SignupComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'todolistapp';

  email: string = '';
  password: string = '';
  user: any = null; 
  name: string = '';  // For signup
  signupEmail: string = ''; // For signup
  phone: string = ''; // For signup
  signupPassword: string = ''; // For signup
  isSignup: boolean = false; // Toggle between login and signup

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.service.getAccessToken(); 
    this.redirectUser();
  }

  redirectUser() {
    if (this.user) {
      this.router.navigate(['/todo']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }

  login() {
    this.service.LoginByEmail(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          console.log('Login successful', user);
          this.service.setUserDetails(user); 
          
          const token = user.token;  // Assuming user has a token property
          if (token) {
            this.service.setAccessToken(token); 
            this.redirectUser(); // Redirect to todo after login
          } else {
            alert('No token found in user data');
          }
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        alert('Login failed: ' + err.message || err);
      }
    });
  }

  signup() {
    const signupData = {
      name: this.name,
      email: this.signupEmail,
      mobile: this.phone,
      password: this.signupPassword,
    };

    this.service.SignupUser(signupData).subscribe({
      next: (user: User | null) => {
        if (user) {
          alert('Signup successful! Please log in.');
          this.toggleSignup(); // Switch to login form
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Signup failed: ' + err.message || err);
      }
    });
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
    this.clearForm();
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.signupEmail = '';
    this.phone = '';
    this.signupPassword = '';
  }

  logout(): void {
    this.service.logout().subscribe({
      next: () => {
        console.log('User logged out successfully');
        this.user = null;
        this.redirectUser(); // Redirect to login after logout
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }
}
