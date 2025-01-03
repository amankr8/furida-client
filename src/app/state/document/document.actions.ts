import { createAction, props } from '@ngrx/store';
import { Document } from '../../shared/interface/document';

export const loadDocuments = createAction('[Documents] Load Documents');

export const loadDocumentsSuccess = createAction(
  '[Documents] Load Documents Success',
  props<{ documents: Document[] }>()
);

export const loadDocumentsFail = createAction(
  '[Documents] Load Documents Fail',
  props<{ error: string }>()
);

export const addDocument = createAction(
  '[Documents] Add Document',
  props<{ document: FormData }>()
);

export const addDocumentSuccess = createAction(
  '[Documents] Add Document Success',
  props<{ document: Document }>()
);

export const addDocumentFail = createAction(
  '[Documents] Add Document Fail',
  props<{ error: string }>()
);

export const openDocEditDialog = createAction(
  '[Document] Open Edit Dialog',
  props<{ documentId: number }>()
);

export const updateDocument = createAction(
  '[Documents] Update Document',
  props<{ documentId: number; document: FormData }>()
);

export const updateDocumentSuccess = createAction(
  '[Documents] Update Document Success',
  props<{ document: Document }>()
);

export const updateDocumentFail = createAction(
  '[Documents] Update Document Fail',
  props<{ error: string }>()
);

export const openDocDeleteDialog = createAction(
  '[Document] Open Delete Dialog',
  props<{ documentId: number }>()
);

export const deleteDocument = createAction(
  '[Document] Delete Document',
  props<{ documentId: number }>()
);

export const deleteDocumentSuccess = createAction(
  '[Document] Delete Document Success',
  props<{ documentId: number }>()
);

export const deleteDocumentFail = createAction(
  '[Document] Delete Document Fail',
  props<{ error: string }>()
);
