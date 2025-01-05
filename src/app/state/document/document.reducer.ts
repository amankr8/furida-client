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
} from './document.actions';
import { Document } from '../../shared/interface/document';

export interface DocumentState {
  documents: Document[];
  isLoaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialDocumentsState: DocumentState = {
  documents: [],
  isLoaded: false,
  loading: false,
  error: null,
};

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
    isLoaded: true,
    loading: false,
  })),

  on(loadDocumentsFail, (state, { error }) => ({
    ...state,
    error,
    isLoaded: false,
    loading: false,
  })),

  on(addDocument, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(addDocumentSuccess, (state, { document }) => ({
    ...state,
    documents: [document, ...state.documents],
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
