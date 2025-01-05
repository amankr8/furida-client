import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFail,
  deleteUser,
  deleteUserSuccess,
  deleteUserFail,
} from './user.actions';
import { User } from '../../shared/interface/user';

export interface UserState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UserState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

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
    loaded: true,
    loading: false,
  })),

  on(loadUsersFail, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
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
    error: error.message,
    loading: false,
  }))
);
