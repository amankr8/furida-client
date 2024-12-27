import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);

  const token = authService.getAuthToken();

  if (token) {
    if (jwtHelper.isTokenExpired(token)) {
      snackBar.open('Your session has expired. Please log in again.', 'Close', {
        duration: 3000,
      });
      router.navigate(['/login']);
      return next(req);
    }

    // Attach Authorization header if token is valid
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
