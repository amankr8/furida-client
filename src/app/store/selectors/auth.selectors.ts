import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUsername = createSelector(
  selectAuthState,
  (state) => state.username
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
