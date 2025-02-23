import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../service/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const snackBarRef = inject(MatSnackBar);
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  // Check if token exists and is not expired
  if (!token) {
    router.navigate(['/']);
    return false;
  } else if (jwtHelper.isTokenExpired(token)) {
    authService.logout();
    router.navigate(['/login']);
    snackBarRef.open('Session expired! Please login again', 'Dismiss', {
      duration: 3000,
    });
    return false;
  } else {
    return true;
  }
};
