import { Document } from '../interface/document';

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
