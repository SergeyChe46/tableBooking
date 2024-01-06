import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);
  let request = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.token),
  });
  return next(request);
};
