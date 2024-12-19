import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectUserById = (id: number) =>
  createSelector(selectUsersState, (state) =>
    state.users.find((usr) => usr.id === id)
  );

export const selectUserByUsername = (username: string) =>
  createSelector(selectUsersState, (state) =>
    state.users.find((usr) => usr.username === username)
  );

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUserLoaded = createSelector(
  selectUsersState,
  (state) => state.isLoaded
);

export const selectLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectUsersState,
  (state) => state.error
);
