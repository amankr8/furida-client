import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { jwtInterceptor } from './config/jwt.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProjectEffects } from './state/project/project.effects';
import { projectReducer } from './state/project/project.reducer';
import { MessageEffects } from './state/message/message.effects';
import { messageReducer } from './state/message/message.reducer';
import { documentReducer } from './state/document/document.reducer';
import { DocumentEffects } from './state/document/document.effects';
import { postReducer } from './state/post/post.reducer';
import { PostEffects } from './state/post/post.effects';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { AuthEffects } from './state/auth/auth.effects';
import { authReducer } from './state/auth/auth.reducer';
import { configReducer } from './state/config/config.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: JWT_OPTIONS, useValue: {} },
    { provide: JwtHelperService, useClass: JwtHelperService },
    provideStore(),
    provideState('projects', projectReducer),
    provideState('messages', messageReducer),
    provideState('documents', documentReducer),
    provideState('posts', postReducer),
    provideState('users', userReducer),
    provideState('auth', authReducer),
    provideState('config', configReducer),
    provideEffects([
      ProjectEffects,
      MessageEffects,
      DocumentEffects,
      PostEffects,
      UserEffects,
      AuthEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
