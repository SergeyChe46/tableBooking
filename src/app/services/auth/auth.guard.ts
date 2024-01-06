import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let jwtHelper = inject(JwtHelperService);
  let router = inject(Router);
  let token = authService.token;

  if (token) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
