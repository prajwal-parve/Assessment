import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('User');
  return !!user; 
};
