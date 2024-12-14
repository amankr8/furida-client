import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFail,
  updateUser,
  updateUserSuccess,
  updateUserFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
} from '../actions/user.actions';
import { initialUsersState } from '../user.state';

export const userReducer = createReducer(
  initialUsersState,
  on(loadUsers, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(loadUsersFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(updateUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((p) => (p.id === user.id ? user : p)),
    loading: false,
  })),

  on(updateUserFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(deleteUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
    loading: false,
  })),

  on(deleteUserFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
