import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DocumentState } from '../document.state';

export const selectDocumentsState =
  createFeatureSelector<DocumentState>('documents');

export const selectDocumentById = (id: number) =>
  createSelector(selectDocumentsState, (state) =>
    state.documents.find((doc) => doc.id === id)
  );

export const selectDocuments = createSelector(
  selectDocumentsState,
  (state) => state.documents
);

export const selectLoading = createSelector(
  selectDocumentsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDocumentsState,
  (state) => state.error
);
