import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = localStorage.getItem('User');
    if (user) {
      return true; // User is authenticated
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // User is not authenticated
    }
  }
}
