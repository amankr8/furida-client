import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { jwtInterceptor } from './jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: JWT_OPTIONS, useValue: {} },
    { provide: JwtHelperService, useClass: JwtHelperService },
    { provide: HTTP_INTERCEPTORS, useValue: jwtInterceptor, multi: true },
  ],
};
