import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor is called');
  const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage

  if (token) {
    console.log('Token: ', token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
