import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/shared/user'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private api: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.api.LoginByEmail(email, password).subscribe(
        (user: User | null) => {
          if (user) {
            
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem("User", JSON.stringify(user));
            }
            this.toastr.success('Login Successful');
            this.router.navigateByUrl('/todo'); 
            this.loginForm.reset(); 
          } else {
            this.toastr.warning("Invalid email or password");
          }
        },
        (err: any) => {
          this.toastr.error(err.error?.message || 'An error occurred while logging in. Please try again.');
          console.error(err);
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }
}
