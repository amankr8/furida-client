import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from './message.reducer';

export const selectMessagesState =
  createFeatureSelector<MessageState>('messages');

export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages
);

export const selectMessageLoaded = createSelector(
  selectMessagesState,
  (state) => state.loaded
);

export const selectMessageLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectMessageError = createSelector(
  selectMessagesState,
  (state) => state.error
);
