import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const snackBarRef = inject(MatSnackBar);

  // Retrieve the token from local storage
  const token = localStorage.getItem('jwtToken');

  // Check if token exists and is not expired
  if (token && !jwtHelper.isTokenExpired(token)) {
    return true; // Allow access if the token is valid
  } else if (jwtHelper.isTokenExpired(token)) {
    // Redirect to the login page if the token is expired
    router.navigate(['/login']);
    snackBarRef.open('Session expired! Please login again', 'Dismiss', {
      duration: 3000,
    });
    return false;
  } else {
    router.navigate(['/']);
    return false;
  }
};
