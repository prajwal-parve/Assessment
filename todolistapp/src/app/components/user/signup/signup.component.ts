import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private api: UserService, private toastr: ToastrService, private router: Router) { 
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.api.SignupUser(this.signupForm.value).subscribe(
        (res: any) => {
          this.toastr.success('Signed up Successfully');
          this.signupForm.reset();
          this.router.navigateByUrl('/login');
        },
        (err: any) => {
          this.toastr.error(err.error?.message || 'Signup failed');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields');
    }
  }
}
