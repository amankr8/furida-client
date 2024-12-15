import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import {
  signInUser,
  signInUserFail,
  signInUserSuccess,
  signUpUser,
  signUpUserFail,
  signUpUserSuccess,
} from '../actions/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadUsers } from '../actions/user.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  signUpUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpUser),
      mergeMap(({ user }) =>
        this.authService.signup(user).pipe(
          map(() => signUpUserSuccess()),
          catchError((err) => of(signUpUserFail({ error: err })))
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
      map(() => loadUsers())
    )
  );

  signUpUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpUserFail),
        tap(({ error }) => {
          this.snackBar.open(this.getSignUpErrMsg(error), 'Dismiss', {
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
          map((res) => {
            const token = res.token;
            localStorage.setItem('jwtToken', token);
            return signInUserSuccess({ username: user.username });
          }),
          catchError((err) => of(signInUserFail({ error: err })))
        )
      )
    )
  );

  signInUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInUserSuccess),
        tap(() => {
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
          this.snackBar.open(this.getLoginErrMsg(error), 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  getLoginErrMsg(err: HttpErrorResponse): string {
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
}
