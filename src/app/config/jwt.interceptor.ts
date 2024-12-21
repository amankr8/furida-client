import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getAuthToken();

  if (token) {
    if (jwtHelper.isTokenExpired(token)) {
      alert('Your session has expired. Please log in again.');
      router.navigate(['/login']);
      return next(req); // Prevents the request from being sent
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
