import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { mergeMap, map, catchError, of, tap, first } from 'rxjs';
import { User } from '../../interface/user';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../service/user/user.service';
import { openEditDialog, openDeleteDialog } from '../actions/user.actions';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFail({ error: error.message })))
        )
      )
    )
  );

  //   openEditDialog$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(openEditDialog),
  //         mergeMap(({ userId }) =>
  //           this.store.select(selectUserById(userId)).pipe(
  //             first(),
  //             map((user) => {
  //               if (user) {
  //                 this.showEditFormDialog(user);
  //               } else {
  //                 console.error('User not found in state');
  //               }
  //             })
  //           )
  //         )
  //       ),
  //     { dispatch: false }
  //   );

  //   showEditFormDialog(user: User) {
  //     this.matDialog.open(UpdateUserComponent, {
  //       data: user,
  //       width: '50%',
  //     });
  //   }

  //   updateUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(updateUser),
  //       mergeMap(({ user }) =>
  //         this.userService.updateUser(user.id, user).pipe(
  //           map((newUser: User) => updateUserSuccess({ user: newUser })),
  //           catchError((error) => of(updateUserFail({ error: error.message })))
  //         )
  //       )
  //     )
  //   );

  //   updateUserSuccess$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(updateUserSuccess),
  //         tap(() => {
  //           this.router.navigate(['/admin/users']);
  //           this.snackBar.open('User updated successfully!', 'Dismiss', {
  //             duration: 3000,
  //           });
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  //   updateUserFail$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(updateUserFail),
  //         tap(({ error }) => {
  //           this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
  //             duration: 3000,
  //           });
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  //   openDeleteDialog$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(openDeleteDialog),
  //         tap(({ userId }) => {
  //           this.showDeleteWarningDialog(deleteUser({ userId }));
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  //   showDeleteWarningDialog(action: Action) {
  //     this.matDialog.open(ConfirmDialogComponent, {
  //       data: {
  //         action: action,
  //         message: 'Are you sure you want to delete this user?',
  //       },
  //       width: '50%',
  //     });
  //   }

  //   deleteUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(deleteUser),
  //       mergeMap(({ userId }) =>
  //         this.userService.deleteUser(userId).pipe(
  //           map(() => deleteUserSuccess({ userId })),
  //           catchError((error) => of(deleteUserFail({ error: error.message })))
  //         )
  //       )
  //     )
  //   );

  //   deleteUserSuccess$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(deleteUserSuccess),
  //         tap(() => {
  //           this.snackBar.open('User deleted successfully!', 'Dismiss', {
  //             duration: 3000,
  //           });
  //         })
  //       ),
  //     { dispatch: false }
  //   );

  //   deleteUserFail$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(deleteUserFail),
  //         tap(({ error }) => {
  //           this.snackBar.open(`Failed to delete: ${error}`, 'Dismiss', {
  //             duration: 3000,
  //           });
  //         })
  //       ),
  //     { dispatch: false }
  //   );
}
