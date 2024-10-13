import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'todolistapp';
  user: any = null;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.user = this.service.getAccessToken();
  }

  get User(): any {
    return this.user;
  }

  logout(): void {
    this.service.logout().subscribe({
      next: () => {
        console.log('User logged out successfully');
        this.user = null;
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

  preventDefault(event: Event): void {
    // Prevent the default action for the click event
    event.preventDefault();
  }
}
