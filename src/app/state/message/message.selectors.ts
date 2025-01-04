import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageState } from './message.reducer';

export const selectMessagesState =
  createFeatureSelector<MessageState>('messages');

export const selectMessages = (archived: boolean) =>
  createSelector(selectMessagesState, (state) =>
    state.messages.filter((msg) => msg.archive === archived)
  );

export const selectMessageLoaded = createSelector(
  selectMessagesState,
  (state) => state.loaded
);

export const selectMessageStatus = createSelector(
  selectMessagesState,
  (state) => state.status
);

export const selectMessageLoading = createSelector(
  selectMessagesState,
  (state) => state.loading
);

export const selectMessageError = createSelector(
  selectMessagesState,
  (state) => state.error
);
