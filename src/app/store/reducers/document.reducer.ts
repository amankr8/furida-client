import { createReducer, on } from '@ngrx/store';
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
} from '../actions/document.actions';
import { initialDocumentsState } from '../document.state';

export const documentReducer = createReducer(
  initialDocumentsState,
  on(loadDocuments, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadDocumentsSuccess, (state, { documents }) => ({
    ...state,
    documents,
    loading: false,
  })),

  on(loadDocumentsFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(addDocument, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(addDocumentSuccess, (state, { document }) => ({
    ...state,
    documents: [...state.documents, document],
    loading: false,
  })),

  on(addDocumentFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(updateDocument, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updateDocumentSuccess, (state, { document }) => ({
    ...state,
    documents: state.documents.map((p) =>
      p.id === document.id ? document : p
    ),
    loading: false,
  })),

  on(updateDocumentFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deleteDocument, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deleteDocumentSuccess, (state, { documentId }) => ({
    ...state,
    documents: state.documents.filter((document) => document.id !== documentId),
    loading: false,
  })),

  on(deleteDocumentFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
