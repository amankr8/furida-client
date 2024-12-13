import { Document } from '../interface/document';

export interface DocumentState {
  documents: Document[];
  loading: boolean;
  error: string | null;
}

export const initialDocumentsState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};
