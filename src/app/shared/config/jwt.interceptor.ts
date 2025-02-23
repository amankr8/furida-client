import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtHelper = inject(JwtHelperService);
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  if (token) {
    if (!jwtHelper.isTokenExpired(token)) {
      // Attach Authorization header if token is valid
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(req);
    }
  }

  return next(req);
};
