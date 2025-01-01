import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { mergeMap, map, catchError, of, tap, first } from 'rxjs';
import { ConfirmDialogComponent } from '../../pages/admin/components/confirm-dialog/confirm-dialog.component';
import { DocumentService } from '../../service/document/document.service';
import {
  loadDocuments,
  loadDocumentsSuccess,
  loadDocumentsFail,
  addDocument,
  addDocumentSuccess,
  addDocumentFail,
  updateDocument,
  updateDocumentSuccess,
  updateDocumentFail,
  deleteDocument,
  deleteDocumentSuccess,
  deleteDocumentFail,
} from '../../state/document/document.actions';
import {
  openDocEditDialog,
  openDocDeleteDialog,
} from '../../state/document/document.actions';
import { selectDocumentById } from './document.selectors';
import { Document } from '../../interface/document';
import { EditDocumentComponent } from '../../pages/admin/documents/components/edit-document/edit-document.component';

@Injectable()
export class DocumentEffects {
  readonly matDialog = inject(MatDialog);

  constructor(
    private actions$: Actions,
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocuments),
      mergeMap(() =>
        this.documentService.getAllDocuments().pipe(
          map((documents) => loadDocumentsSuccess({ documents })),
          catchError((error) => of(loadDocumentsFail({ error: error.message })))
        )
      )
    )
  );

  addDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDocument),
      mergeMap(({ document }) =>
        this.documentService.addDocument(document).pipe(
          map((newDocument: Document) =>
            addDocumentSuccess({ document: newDocument })
          ),
          catchError((error) => of(addDocumentFail({ error: error.message })))
        )
      )
    )
  );

  addDocumentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addDocumentSuccess),
        tap(() => {
          this.router.navigate(['/admin/documents']);
          this.snackBar.open('Document added successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  addDocumentFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addDocumentFail),
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  openEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDocEditDialog),
        mergeMap(({ documentId }) =>
          this.store.select(selectDocumentById(documentId)).pipe(
            first(),
            map((document) => {
              if (document) {
                this.showEditFormDialog(document);
              } else {
                console.error('Document not found in state');
              }
            })
          )
        )
      ),
    { dispatch: false }
  );

  showEditFormDialog(document: Document) {
    this.matDialog.open(EditDocumentComponent, {
      panelClass: 'custom-dialog-container',
      data: document,
    });
  }

  updateDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDocument),
      mergeMap(({ documentId, document }) =>
        this.documentService.updateDocument(documentId, document).pipe(
          map((newDocument: Document) =>
            updateDocumentSuccess({ document: newDocument })
          ),
          catchError((error) =>
            of(updateDocumentFail({ error: error.message }))
          )
        )
      )
    )
  );

  updateDocumentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDocumentSuccess),
        tap(() => {
          this.router.navigate(['/admin/documents']);
          this.snackBar.open('Document updated successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  updateDocumentFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDocumentFail),
        tap(({ error }) => {
          this.snackBar.open(`Server Error: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  openDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openDocDeleteDialog),
        tap(({ documentId }) => {
          this.showDeleteWarningDialog(deleteDocument({ documentId }));
        })
      ),
    { dispatch: false }
  );

  showDeleteWarningDialog(action: Action) {
    this.matDialog.open(ConfirmDialogComponent, {
      panelClass: 'alert-dialog-container',
      data: {
        action: action,
        message: 'Are you sure you want to delete this document?',
      },
    });
  }

  deleteDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDocument),
      mergeMap(({ documentId }) =>
        this.documentService.deleteDocument(documentId).pipe(
          map(() => deleteDocumentSuccess({ documentId })),
          catchError((error) =>
            of(deleteDocumentFail({ error: error.message }))
          )
        )
      )
    )
  );

  deleteDocumentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteDocumentSuccess),
        tap(() => {
          this.snackBar.open('Document deleted successfully!', 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  deleteDocumentFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteDocumentFail),
        tap(({ error }) => {
          this.snackBar.open(`Failed to delete: ${error}`, 'Dismiss', {
            duration: 3000,
          });
        })
      ),
    { dispatch: false }
  );
}
