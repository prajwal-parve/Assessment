import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { provideHttpClient } from '@angular/common/http';

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

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.service.getAccessToken(); 
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
                
                // Assuming user has a token property
                const token = user.token;  // Change this to whatever your User model has
                if (token) {
                    this.service.setAccessToken(token); 
                } else {
                    alert('No token found in user data');
                }
            } else {
                alert('Invalid email or password');
            }
        },
        error: (err) => {
            alert('Login failed: ' + err);
        }
    });
}



logout(): void {
  this.service.logout().subscribe({
      next: () => {
          console.log('User logged out successfully');
          this.user = null;
          this.router.navigate(['/login']); 
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
