import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  // Retrieve the token from local storage
  const token = localStorage.getItem('jwtToken');

  // Check if token exists and is not expired
  if (token && !jwtHelper.isTokenExpired(token)) {
    return true; // Allow access if the token is valid
  } else {
    // Redirect to the login page if the token is missing or expired
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
