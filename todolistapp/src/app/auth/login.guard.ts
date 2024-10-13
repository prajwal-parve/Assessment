import { CanActivateFn } from '@angular/router';

export const LoginGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('User');
  return !user; 
};
