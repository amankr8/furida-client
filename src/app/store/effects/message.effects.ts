import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ContactService } from '../../service/contact/contact.service';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import {
  loadMessages,
  loadMessagesSuccess,
  loadMessagesFail,
  toggleArchive,
  toggleArchiveSuccess,
  toggleArchiveFail,
  deleteMessage,
  openDeleteDialog,
  deleteMessageFail,
  deleteMessageSuccess,
} from '../actions/message.action';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class MessageEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private messageService: ContactService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      mergeMap(() =>
        this.messageService.getAllMessages().pipe(
          map((messages) => loadMessagesSuccess({ messages })),
          catchError((error) => of(loadMessagesFail({ error: error.message })))
        )
      )
    )
  );

  toggleArchive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleArchive),
      mergeMap(({ messageId }) =>
        this.messageService.toggleReadStatus(messageId).pipe(
          map((message) => toggleArchiveSuccess({ message })),
          catchError((error) => of(toggleArchiveFail({ error: error.message })))
        )
      )
    )
  );

  openDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDeleteDialog),
        tap(({ messageId }) => {
          this.showDeleteWarningDialog(deleteMessage({ messageId }));
        })
      ),
    { dispatch: false }
  );

  showDeleteWarningDialog(action: Action) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        action: action,
        message: 'Are you sure you want to delete this message?',
      },
      width: '50%',
    });
  }

  deleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMessage),
      mergeMap(({ messageId }) =>
        this.messageService.deleteMessage(messageId).pipe(
          map(() => deleteMessageSuccess({ messageId })),
          catchError((error) => of(deleteMessageFail({ error: error.message })))
        )
      )
    )
  );

  deleteMessageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteMessageSuccess),
        tap(() => {
          this.snackBar.open('Message deleted successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deleteMessageFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteMessageFail),
        tap(({ error }) => {
          this.snackBar.open(`Failed to delete: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
