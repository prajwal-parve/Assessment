import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUserDetails();

    // Log the user's authentication status for debugging
    console.log('User details:', user);

    if (user) {
      // User is logged in; redirecting to /todo
      this.router.navigate(['/todo']);
      return false; // Block access to the intended route
    }
    
    // User is not logged in; allow access to the intended route
    return true;
  }
}
