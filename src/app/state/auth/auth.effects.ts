import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import {
  confirmLogout,
  loadAuthUser,
  loadAuthUserFail,
  loadAuthUserSuccess,
  logoutUser,
  signInUser,
  signInUserFail,
  signInUserSuccess,
  signUpUser,
  signUpUserFail,
  signUpUserSuccess,
  updatePass,
  updatePassFail,
  updatePassSuccess,
} from '../../state/auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUser, loadUsers } from '../../state/user/user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { AdminRouteService } from '../../service/admin-route/admin-route.service';

@Injectable()
export class AuthEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private routeService: AdminRouteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loadAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthUser),
      mergeMap(() =>
        this.authService.getAuthUser().pipe(
          map((user) => loadAuthUserSuccess({ user })),
          catchError((err) => of(loadAuthUserFail({ error: err.message })))
        )
      )
    )
  );

  loadAuthUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadAuthUserFail),
        tap(() => {
          this.snackBar.open('Error loading user details!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  signUpUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpUser),
      mergeMap(({ user }) =>
        this.authService.signup(user).pipe(
          map((res) => signUpUserSuccess({ user: res.user })),
          catchError((err) =>
            of(signUpUserFail({ error: this.getSignUpErrMsg(err) }))
          )
        )
      )
    )
  );

  signUpUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpUserSuccess),
      tap(() => {
        this.router.navigate(['/admin/users']);
        this.snackBar.open('Added user successfully!', 'Dismiss', {
          duration: 3000,
        });
      }),
      map(({ user }) => AddUser({ user }))
    )
  );

  signUpUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpUserFail),
        tap(({ error }) => {
          this.snackBar.open(error, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  getSignUpErrMsg(err: HttpErrorResponse): string {
    switch (err.status) {
      case 400:
        return 'Error: User already exists';
      case 500:
        return 'Server Error: Please try again later';
      default:
        return 'Error: An unknown error occurred';
    }
  }

  signInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInUser),
      mergeMap(({ user }) =>
        this.authService.login(user).pipe(
          map((res) => signInUserSuccess({ user: res.user, token: res.token })),
          catchError((err) =>
            of(signInUserFail({ error: this.getAuthErrMsg(err) }))
          )
        )
      )
    )
  );

  signInUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInUserSuccess),
        tap(({ token }) => {
          this.authService.setAuthToken(token);
          this.router.navigate(['/admin']);
          this.snackBar.open('Logged In successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  signInUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInUserFail),
        tap(({ error }) => {
          this.snackBar.open(error, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  getAuthErrMsg(err: HttpErrorResponse): string {
    switch (err.status) {
      case 404:
        return "Error: User doesn't exist";
      case 400:
        return 'Error: Invalid credentials';
      case 500:
        return 'Server Error: Please try again later';
      default:
        return 'Error: An unknown error occurred';
    }
  }

  updatePass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePass),
      mergeMap(({ oldPassword, newPassword }) =>
        this.authService.updateUser(oldPassword, newPassword).pipe(
          map(() => updatePassSuccess()),
          catchError((error) =>
            of(updatePassFail({ error: this.getAuthErrMsg(error) }))
          )
        )
      )
    )
  );

  updatePassSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePassSuccess),
        tap(() => {
          this.router.navigate(['/admin/users']);
          this.snackBar.open('Details updated successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updatePassFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updatePassFail),
        tap(({ error }) => {
          this.snackBar.open(error, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  confirmLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmLogout),
        tap(() => {
          this.matDialog.open(ConfirmDialogComponent, {
            panelClass: 'alert-dialog-container',
            data: {
              action: logoutUser(),
              message: 'Are you sure you want to logout?',
            },
          });
        })
      ),
    { dispatch: false }
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUser),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/']);
          this.snackBar.open('Logged out successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
