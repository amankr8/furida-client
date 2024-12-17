import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthLoaded = createSelector(
  selectAuthState,
  (state) => state.loaded
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
