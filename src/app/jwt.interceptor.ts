import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

  if (token) {
    // Check if the token is expired
    if (jwtHelper.isTokenExpired(token)) {
      alert('Your session has expired. Please log in again.');
      router.navigate(['/login']); // Redirect to login page
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
